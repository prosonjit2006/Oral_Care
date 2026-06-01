import { useState } from "react";
import type { NotificationItem } from "../../type/interface/profile.interface";
import { Card, Divider, Toggle } from "./Ui";

interface ProfileNotificationsProps {
  notifications: NotificationItem[];
}

const ProfileNotifications = ({ notifications }: ProfileNotificationsProps) => {
  // temporary toggle
  const [active, setIsActive] = useState<boolean>(true);

  return (
    <Card className="p-5">
      <p className="font-bold text-[15px] text-slate-900 mb-4">
        Notification Preferences
      </p>
      <Divider className="mb-4" />

      <div className="space-y-2.5">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.label}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-slate-800 text-sm font-medium">
                    {n.label}
                  </p>
                  <p className="text-slate-400 text-xs">{n.sub}</p>
                </div>
              </div>
              <button
                onClick={() => setIsActive(active === true ? false : true)}
              >
                <Toggle
                  // checked={n.checked}
                  checked={active}
                />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProfileNotifications;
