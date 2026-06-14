import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useredux";
import PatientServiceChart from "../../Section/admin/PatientServiceChart";
import { fetchAppointmentList } from "../../store/slices/appointment.slice";

const Dashboard = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAppointmentList());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Welcome back — here's your clinic's overview.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart card — top-left, spans two columns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Patient Service Booking Records
          </h2>
          <PatientServiceChart />
        </div>

        {/* Placeholders for upcoming cards */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-6 h-48 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-medium text-slate-400">
              Payment Records
            </span>
            <span className="text-xs text-slate-300 mt-1">Coming soon</span>
          </div>
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-6 h-48 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-medium text-slate-400">
              Summary Stats
            </span>
            <span className="text-xs text-slate-300 mt-1">Coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
