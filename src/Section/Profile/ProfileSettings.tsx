import { Lock, Trash2, LogOut, Key } from "lucide-react";
import { Card, Divider } from "./Ui";

interface ProfileSettingsProps {
  onChangePassword?: () => void;
  onForgotPassword?: () => void;
  onDeleteAccount?: () => void;
  onLogout?: () => void;
}

const ProfileSettings = ({
  onChangePassword,
  onForgotPassword,
  onDeleteAccount,
  onLogout,
}: ProfileSettingsProps) => {
  return (
    <Card className="p-5">
      <p className="font-bold text-[0.95rem] text-slate-900 mb-4">
        Account Settings
      </p>
      <Divider className="mb-4" />

      <div className="space-y-2.5">
        <button
          onClick={onChangePassword}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium
            hover:bg-white hover:border-slate-300 transition-all"
        >
          <Lock size={15} className="text-slate-400" />
          Change Password
        </button>

        <button
          onClick={onForgotPassword}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium
            hover:bg-white hover:border-slate-300 transition-all"
        >
          <Key size={15} className="text-slate-400" />
          Forgot Password
        </button>

        <button
          onClick={onDeleteAccount}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            border border-red-100 bg-red-50 text-red-500 text-sm font-medium
            hover:bg-red-100 hover:border-red-200 transition-all"
        >
          <Trash2 size={15} />
          Delete Account
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            bg-slate-900 text-white text-sm font-semibold
            hover:bg-slate-800 transition-all"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </Card>
  );
};

export default ProfileSettings;
