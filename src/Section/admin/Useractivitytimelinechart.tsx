import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

// Shape of a single document in the `users` Appwrite collection.
interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string | null;
}

interface RootState {
  user: {
    user: User[];
  };
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

// Build one bucket per day between the earliest signup and today, so the
// timeline reflects the account's actual activity window instead of a
// fixed lookback window.
const buildDayBuckets = (users: User[]) => {
  if (users.length === 0) return [];

  const timestamps = users.map((u) => new Date(u.$createdAt).getTime());
  const earliest = new Date(Math.min(...timestamps));
  earliest.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const buckets: { key: string; label: string }[] = [];
  const cursor = new Date(earliest);

  while (cursor <= today) {
    buckets.push({
      key: cursor.toISOString().slice(0, 10),
      label: DATE_FORMATTER.format(cursor),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return buckets;
};

// New signups per day (bar-like line) plus a cumulative running total
// (area-filled line) — two views of the same growth timeline at once.
const buildChartData = (users: User[]): ChartData<"line"> => {
  const buckets = buildDayBuckets(users);
  const newByDay = new Map(buckets.map((b) => [b.key, 0]));

  users.forEach((u) => {
    const key = u.$createdAt?.slice(0, 10);
    if (key && newByDay.has(key)) {
      newByDay.set(key, (newByDay.get(key) ?? 0) + 1);
    }
  });

  let running = 0;
  const cumulative = buckets.map((b) => {
    running += newByDay.get(b.key) ?? 0;
    return running;
  });

  return {
    labels: buckets.map((b) => b.label),
    datasets: [
      {
        label: "Total Users",
        data: cumulative,
        borderColor: "#2DD4BF", // teal-400
        backgroundColor: "rgba(45, 212, 191, 0.15)",
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        yAxisID: "yTotal",
        order: 2,
      },
      {
        label: "New Signups",
        data: buckets.map((b) => newByDay.get(b.key) ?? 0),
        borderColor: "#FBBF24", // amber-400
        backgroundColor: "#FBBF24",
        pointRadius: buckets.map((b) =>
          (newByDay.get(b.key) ?? 0) > 0 ? 4 : 0,
        ),
        pointHoverRadius: 6,
        borderWidth: 2,
        borderDash: [4, 3],
        tension: 0.3,
        fill: false,
        yAxisID: "yNew",
        order: 1,
      },
    ],
  };
};

const options: ChartOptions<"line"> = {
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
          const value = context.parsed.y ?? 0;
          if (context.dataset.label === "Total Users") {
            return `Total Users: ${value}`;
          }
          return `New Signups: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#A1A1AA", // zinc-400
        font: { size: 11 },
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 10,
      },
      border: { color: "rgba(255, 255, 255, 0.08)" },
    },
    yTotal: {
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
        text: "Total Users",
        color: "#A1A1AA",
        font: { size: 11 },
      },
    },
    yNew: {
      type: "linear",
      position: "right",
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        color: "#A1A1AA",
        font: { size: 12 },
        precision: 0,
        stepSize: 1,
      },
      border: { display: false },
      title: {
        display: true,
        text: "New Signups",
        color: "#A1A1AA",
        font: { size: 11 },
      },
    },
  },
};

const UserActivityTimelineChart = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user || user.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-sm text-zinc-500">
        No user data yet.
      </div>
    );
  }

  const data = buildChartData(user);

  return (
    <div className="w-full h-[400px]">
      <Line options={options} data={data} />
    </div>
  );
};

export default UserActivityTimelineChart;
