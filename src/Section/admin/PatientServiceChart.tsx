import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useredux";
import { fetchAppointmentList } from "../../store/slices/appointment.slice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const STATUS_COLORS = {
  confirmed: "#2D6E7E", // deep teal
  pending: "#F4A261", // warm amber
};

// In Appwrite, `status` is stored as a boolean: true = confirmed by staff,
// false = still pending. Handles either a real boolean or a stringified one.
const isConfirmed = (status:any) => status === true || status === "true";

// Turn the raw Appointments array into one stacked bar per service,
// split into "Confirmed" vs "Pending" counts.
const buildChartData = (appointments:any) => {
  const serviceTitles = [...new Set(appointments.map((a:any) => a.serviceTitle))];

  const confirmedCounts = serviceTitles.map(
    (title) =>
      appointments.filter(
        (a:any) => a.serviceTitle === title && isConfirmed(a.status),
      ).length,
  );

  const pendingCounts = serviceTitles.map(
    (title) =>
      appointments.filter(
        (a:any) => a.serviceTitle === title && !isConfirmed(a.status),
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1500,
    easing: "easeOutQuart",
    // Stagger each segment so the bars build up left-to-right
    // instead of popping in all at once.
    delay: (context) => {
      if (context.type !== "data") return 0;
      return context.dataIndex * 90 + context.datasetIndex * 70;
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
      titleFont: { size: 12, weight: "600" },
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
  // Swap useSelector for your typed useAppSelector hook if you have one.
  const { Appointments } = useSelector((state) => state.appointment);

  console.log('appointments', Appointments)

  

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
