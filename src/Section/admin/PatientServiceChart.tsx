import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

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

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SERVICE_COLOR_PALETTE = [
  "#2DD4BF", // teal-400
  "#FBBF24", // amber-400
  "#F472B6", // pink-400
  "#818CF8", // indigo-400
  "#34D399", // emerald-400
  "#FB923C", // orange-400
];

const toMondayFirstIndex = (date: Date): number => (date.getDay() + 6) % 7;

const buildChartData = (appointments: Appointment[]): ChartData<"bar"> => {
  const serviceNames = Array.from(
    new Set(appointments.map((a) => a.serviceName)),
  );

  const datasets = serviceNames.map((name, index) => {
    const countsByDay = Array(7).fill(0);

    appointments
      .filter((a) => a.serviceName === name)
      .forEach((a) => {
        const createdAt = new Date(a.$createdAt);
        countsByDay[toMondayFirstIndex(createdAt)] += 1;
      });

    return {
      label: name,
      data: countsByDay,
      backgroundColor:
        SERVICE_COLOR_PALETTE[index % SERVICE_COLOR_PALETTE.length],
      borderRadius: 3,
      categoryPercentage: 0.5,
      barPercentage: 1,
    };
  });

  return {
    labels: DAY_LABELS,
    datasets,
  };
};

interface AnimationDelayContext {
  type?: string;
  dataIndex?: number;
  datasetIndex?: number;
}

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1500,
    easing: "easeOutQuart",
    delay: (context: AnimationDelayContext) => {
      if (context.type !== "data") return 0;
      return (context.dataIndex ?? 0) * 90 + (context.datasetIndex ?? 0) * 70;
    },
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
    title: {
      display: false,
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
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      ticks: { color: "#A1A1AA", font: { size: 12 } }, // zinc-400
      border: { color: "rgba(255, 255, 255, 0.08)" },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: { color: "rgba(255, 255, 255, 0.06)" },
      ticks: {
        color: "#A1A1AA",
        font: { size: 12 },
        precision: 0,
        stepSize: 1,
      },
      border: { display: false },
    },
  },
};

const PatientServiceChart = () => {
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
      <Bar options={options} data={data} />
    </div>
  );
};

export default PatientServiceChart;
