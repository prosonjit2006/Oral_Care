import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useredux";
import PatientServiceChart from "../../Section/admin/PatientServiceChart";
import { fetchAppointmentList } from "../../store/slices/appointment.slice";
import TopServicesPieChart from "../../Section/admin/Topservicespiechart";
import { fetchPaymentsRecordList } from "../../store/slices/payments.slice";
import BookingFrequencyRevenueChart from "../../Section/admin/Bookingfrequencyrevenuechart ";
import { fetchUserList } from "../../store/slices/user.slice";
import UserActivityTimelineChart from "../../Section/admin/Useractivitytimelinechart";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAppointmentList());
    dispatch(fetchPaymentsRecordList());
    dispatch(fetchUserList());
  }, [dispatch]);

  return (
    <div className="h-auto ">
      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
        {/* Chart card — top-left, spans two columns */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            Patient Service Booking Records
          </h2>
          <PatientServiceChart />
        </div>

        {/* topservice booking  */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            Top Booked Services
          </h2>
          <TopServicesPieChart />
        </div>

        {/* revienew chart  */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            Booking Frequency & Revenue (Last 14 Days)
          </h2>
          <BookingFrequencyRevenueChart />
        </div>

        {/* revienew chart  */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            User Activity History
          </h2>
          <UserActivityTimelineChart />
        </div>

        {/* lg:col-span-1 — Payment Records / Summary Stats go back here */}
      </div>
    </div>
  );
};

export default Dashboard;
