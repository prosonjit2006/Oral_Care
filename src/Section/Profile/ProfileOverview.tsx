// src/components/profile/ProfileOverview.tsx

import type {
  QuickAction,
  StatItem,
} from "../../type/interface/profile.interface";

import { Card } from "./Ui";

interface ProfileOverviewProps {
  stats: StatItem[];
  actions: QuickAction[];
}

const ProfileOverview = ({ stats, actions }: ProfileOverviewProps) => {
  return (
    <div className="space-y-4">
      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div
              className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.border} border flex items-center justify-center mb-3`}
            >
              <span className={`text-lg font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>

            <p className="text-slate-500 text-[13px] font-medium tracking-wide">
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      {/* quick actions */}
      <Card className="p-5">
        <p
          className="text-[13px] font-semibold text-slate-400
          tracking-widest uppercase mb-3">
          Quick Actions
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
              // onClick={()=> }
                key={action.label}
                className={`flex items-center gap-2 px-3.5 py-3 rounded-xl border text-sm font-semibold transition-all
                ${action.bg}
                ${action.color}
                ${action.border}
                ${action.hover}`}
              >
                <Icon size={15} />
                {action.label}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ProfileOverview;
