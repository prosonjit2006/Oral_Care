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

// Minimal slice shape this component needs. If you already have a typed
// RootState (e.g. from "../../store"), swap this for that import instead.
interface RootState {
  appointment: {
    Appointments: Appointment[];
  };
}

const STATUS_COLORS = {
  confirmed: "#2D6E7E", // deep teal
  pending: "#F4A261", // warm amber
};

// In Appwrite, `status` is stored as a boolean: true = confirmed by staff,
// false = still pending. Handles either a real boolean or a stringified one.
const isConfirmed = (status: boolean | string): boolean =>
  status === true || status === "true";

// Turn the raw Appointments array into one stacked bar per service,
// split into "Confirmed" vs "Pending" counts.
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

// Minimal shape of the animation callback context we actually use —
// avoids pulling in chart.js's internal AnimationContext type.
interface AnimationDelayContext {
  type?: string;
  dataIndex?: number;
  datasetIndex?: number;
}

// Typing this as ChartOptions<"bar"> lets TS narrow string literals like
// "index" and "easeOutQuart" to the exact union members chart.js expects.
const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1500,
    easing: "easeOutQuart",
    // Stagger each segment so the bars build up left-to-right
    // instead of popping in all at once.
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
        color: "#4B5563",
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#1F2937",
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
      ticks: { color: "#6B7280", font: { size: 12 } },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: { color: "#F1F3F5" },
      ticks: {
        color: "#6B7280",
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
      <div className="w-full h-[400px] flex items-center justify-center text-sm text-slate-400">
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
