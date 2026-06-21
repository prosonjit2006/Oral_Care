import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Shape of a single document in the `appointments` Appwrite collection
// (matches the current collection schema).
interface Appointment {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  patientName: string;
  patientId: string | null;
  serviceName: string;
  doctorName: string;
  appointmentDate: string | null;
  appointmentTime: string | null;
  patientEmail: string | null;
  status: boolean | null;
  message: string | null;
}

interface RootState {
  appointment: {
    Appointments: Appointment[];
  };
}

// Same palette as the bar chart so service colors stay consistent
// across the dashboard.
const SERVICE_COLOR_PALETTE = [
  "#2DD4BF", // teal-400
  "#FBBF24", // amber-400
  "#F472B6", // pink-400
  "#818CF8", // indigo-400
  "#34D399", // emerald-400
  "#FB923C", // orange-400
  "#60A5FA", // blue-400
  "#A78BFA", // violet-400
];

// How many individual slices to show before bucketing the rest into "Others".
const MAX_SLICES = 6;

// Count bookings per service, sort descending, and collapse anything
// beyond MAX_SLICES into a single "Others" slice so the legend stays
// readable even with many services.
const buildChartData = (appointments: Appointment[]): ChartData<"pie"> => {
  const countsByService = new Map<string, number>();

  appointments.forEach((a) => {
    const name = a.serviceName || "Unknown";
    countsByService.set(name, (countsByService.get(name) ?? 0) + 1);
  });

  const sorted = Array.from(countsByService.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  const topServices = sorted.slice(0, MAX_SLICES);
  const rest = sorted.slice(MAX_SLICES);
  const othersTotal = rest.reduce((sum, [, count]) => sum + count, 0);

  const labels = topServices.map(([name]) => name);
  const data = topServices.map(([, count]) => count);

  if (othersTotal > 0) {
    labels.push("Others");
    data.push(othersTotal);
  }

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map(
          (_, index) =>
            SERVICE_COLOR_PALETTE[index % SERVICE_COLOR_PALETTE.length],
        ),
        borderColor: "#18181B", // zinc-900, matches the dashboard card bg
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };
};

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 1200,
    easing: "easeOutQuart",
  },
  plugins: {
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 8,
        padding: 14,
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
          const value = context.parsed as number;
          const total = (context.dataset.data as number[]).reduce(
            (sum, v) => sum + v,
            0,
          );
          const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
          return `${context.label}: ${value} (${pct}%)`;
        },
      },
    },
  },
};

const TopServicesPieChart = () => {
  const { Appointments } = useSelector((state: RootState) => state.appointment);

  if (!Appointments || Appointments.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-sm text-zinc-500">
        No appointment data yet.
      </div>
    );
  }

  const data = buildChartData(Appointments);

  return (
    <div className="w-full h-[400px]">
      <Pie options={options} data={data} />
    </div>
  );
};

export default TopServicesPieChart;
