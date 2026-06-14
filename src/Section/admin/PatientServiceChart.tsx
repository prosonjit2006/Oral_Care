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

// Shape of a single document in the `appointment` Appwrite collection.
interface Appointment {
  $id: string;
  serviceTitle: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  message: string;
  status: boolean | string;
  userId: string;
  doctorId: number;
  $createdAt: string;
  $updatedAt: string;
}

interface RootState {
  appointment: {
    Appointments: Appointment[];
  };
}

// Brighter pairing for the dark card: teal for "confirmed", gold for
// "pending" — the gold echoes the "Admin Console" accent in the sidebar.
const STATUS_COLORS = {
  confirmed: "#2DD4BF", // teal-400
  pending: "#FBBF24", // amber-400
};

const isConfirmed = (status: boolean | string): boolean =>
  status === true || status === "true";

const buildChartData = (appointments: Appointment[]): ChartData<"bar"> => {
  const serviceTitles = Array.from(
    new Set(appointments.map((a) => a.serviceTitle)),
  );

  const confirmedCounts = serviceTitles.map(
    (title) =>
      appointments.filter(
        (a) => a.serviceTitle === title && isConfirmed(a.status),
      ).length,
  );

  const pendingCounts = serviceTitles.map(
    (title) =>
      appointments.filter(
        (a) => a.serviceTitle === title && !isConfirmed(a.status),
      ).length,
  );

  return {
    labels: serviceTitles,
    datasets: [
      {
        label: "Confirmed",
        data: confirmedCounts,
        backgroundColor: STATUS_COLORS.confirmed,
        borderRadius: 3,
        categoryPercentage: 0.5,
        barPercentage: 1,
      },
      {
        label: "Pending",
        data: pendingCounts,
        backgroundColor: STATUS_COLORS.pending,
        borderRadius: 3,
        categoryPercentage: 0.5,
        barPercentage: 1,
      },
    ],
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
