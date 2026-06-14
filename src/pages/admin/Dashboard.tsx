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
    <div className="min-h-screen bg-black p-6 lg:p-8">
      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart card — top-left, spans two columns */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            Patient Service Booking Records
          </h2>
          <PatientServiceChart />
        </div>

        {/* lg:col-span-1 — Payment Records / Summary Stats go back here */}
      </div>
    </div>
  );
};

export default Dashboard;
