import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Shape of a single document in the `bookingHistory` Appwrite collection.
interface PaymentRecord {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  invoice_id: string | null;
  stripe_session_id: string | null;
  patient_name: string | null;
  patient_email: string | null;
  item_name: string | null;
  item_type: string | null;
  amount: string | null; // stored as text, parse before summing
  payment_status: string | null;
  payment_method: string | null;
  card_brand: string | null;
  card_last4: string | null;
  interval: string | null;
  patient_id: string | null;
}

interface RootState {
  payments: {
    Payments: PaymentRecord[];
  };
}

// How many of the most recent days to show on the x-axis.
const DAYS_TO_SHOW = 14;

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

// Formats numbers as Indian Rupees, e.g. ₹16,879
const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

// Build a list of the last N day buckets (oldest -> newest), each keyed
// by a sortable "YYYY-MM-DD" string and a display label like "Jun 18".
const buildDayBuckets = (days: number) => {
  const buckets: { key: string; label: string }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    buckets.push({
      key: d.toISOString().slice(0, 10),
      label: DATE_FORMATTER.format(d),
    });
  }

  return buckets;
};

// Group payments by day, counting bookings (bar) and summing successful
// payment amounts (line) per day. Only "succeeded"/"paid" payments count
// toward revenue, but every record counts toward booking frequency.
const buildChartData = (
  payments: PaymentRecord[],
): ChartData<"bar" | "line"> => {
  const buckets = buildDayBuckets(DAYS_TO_SHOW);
  const countByDay = new Map(buckets.map((b) => [b.key, 0]));
  const amountByDay = new Map(buckets.map((b) => [b.key, 0]));

  payments.forEach((p) => {
    const key = p.$createdAt?.slice(0, 10);
    if (!key || !countByDay.has(key)) return;

    countByDay.set(key, (countByDay.get(key) ?? 0) + 1);

    const status = (p.payment_status ?? "").toLowerCase();
    const isSuccessful =
      status === "completed" ||
      status === "succeeded" ||
      status === "paid" ||
      status === "complete";
    if (isSuccessful) {
      const parsed = parseFloat(p.amount ?? "0");
      if (!Number.isNaN(parsed)) {
        amountByDay.set(key, (amountByDay.get(key) ?? 0) + parsed);
      }
    }
  });

  return {
    labels: buckets.map((b) => b.label),
    datasets: [
      {
        type: "bar" as const,
        label: "Bookings",
        data: buckets.map((b) => countByDay.get(b.key) ?? 0),
        backgroundColor: "#818CF8", // indigo-400
        borderRadius: 4,
        categoryPercentage: 0.6,
        barPercentage: 0.9,
        yAxisID: "yCount",
        order: 2,
      },
      {
        type: "line" as const,
        label: "Revenue (₹)",
        data: buckets.map((b) =>
          Number((amountByDay.get(b.key) ?? 0).toFixed(2)),
        ),
        borderColor: "#34D399", // emerald-400
        backgroundColor: "#34D399",
        pointBackgroundColor: "#34D399",
        pointBorderColor: "#18181B",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: false,
        yAxisID: "yAmount",
        order: 1,
      },
    ],
  };
};

const options: ChartOptions<"bar" | "line"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1200,
    easing: "easeOutQuart",
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 8,
        padding: 16,
        font: { size: 12 },
        color: "#D4D4D8", // zinc-300
      },
    },
    tooltip: {
      backgroundColor: "#27272A", // zinc-800
      borderColor: "rgba(255, 255, 255, 0.08)",
      borderWidth: 1,
      titleColor: "#F4F4F5",
      bodyColor: "#D4D4D8",
      titleFont: { size: 12 },
      bodyFont: { size: 12 },
      padding: 10,
      cornerRadius: 6,
      boxPadding: 4,
      callbacks: {
        label: (context) => {
          if (context.dataset.label === "Revenue (₹)") {
            return `Revenue: ${INR_FORMATTER.format(context.parsed.y ?? 0)}`;
          }
          return `Bookings: ${context.parsed.y ?? 0}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#A1A1AA", font: { size: 11 } }, // zinc-400
      border: { color: "rgba(255, 255, 255, 0.08)" },
    },
    yCount: {
      type: "linear",
      position: "left",
      beginAtZero: true,
      grid: { color: "rgba(255, 255, 255, 0.06)" },
      ticks: {
        color: "#A1A1AA",
        font: { size: 12 },
        precision: 0,
        stepSize: 1,
      },
      border: { display: false },
      title: {
        display: true,
        text: "Bookings",
        color: "#A1A1AA",
        font: { size: 11 },
      },
    },
    yAmount: {
      type: "linear",
      position: "right",
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        color: "#A1A1AA",
        font: { size: 12 },
        callback: (value) => INR_FORMATTER.format(Number(value)),
      },
      border: { display: false },
      title: {
        display: true,
        text: "Revenue (₹)",
        color: "#A1A1AA",
        font: { size: 11 },
      },
    },
  },
};

const BookingFrequencyRevenueChart = () => {
  const { Payments } = useSelector((state: RootState) => state.payments);

  if (!Payments || Payments.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-sm text-zinc-500">
        No booking history yet.
      </div>
    );
  }

  const data = buildChartData(Payments);

  return (
    <div className="w-full h-[400px]">
      <Chart type="bar" options={options} data={data} />
    </div>
  );
};

export default BookingFrequencyRevenueChart;
