import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { Card, SectionHeader, Divider } from "./Ui";
import type { Appointment } from "../../type/interface/profile.interface";

interface ProfileAppointmentsProps {
  appointments: Appointment[];
}

const ProfileAppointments = ({ appointments }: ProfileAppointmentsProps) => {
  return (
    <Card className="p-5">
      <SectionHeader
        icon={CalendarDays}
        title="Upcoming Appointments"
        iconBg="bg-violet-50"
        iconColor="text-violet-500"
        badge={
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-100">
            {appointments.length} scheduled
          </span>
        }
      />
      <Divider className="mb-4" />

      <div className="space-y-3">
        {appointments.map((appt, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5
              rounded-xl border border-slate-100 bg-slate-50
              hover:bg-white hover:border-slate-200 transition-all"
          >
            {/* doctor avatar */}
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${appt.avatarBg} ${appt.avatarColor} border ${appt.avatarBorder}`}
            >
              {appt.avatar}
            </div>

            {/* doctor info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">
                {appt.doctor}
              </p>
              <p className="text-slate-500 text-xs">
                {appt.service} · {appt.specialty}
              </p>
            </div>

            {/* date/time */}
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Clock size={13} className="text-slate-400 flex-shrink-0" />
              <span>
                {appt.date} · {appt.time}
              </span>
            </div>

            {/* status */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold w-fit">
              <CheckCircle2 size={12} />
              Confirmed
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProfileAppointments;
