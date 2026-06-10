import { Pencil } from "lucide-react";
import type { Profile } from "../../type/interface/profile.interface";
import { useAppDispatch } from "../../hooks/useredux";
import { setProfileDialogOpen } from "../../store/slices/profile.slice";

// interface ProfileHeroProps {
//   name: string;
//   email: string;
//   phone: string;
//   isActive?: boolean;
// }

const ProfileHero = ({ name, email, phone, status }: Profile) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6 md:p-10 
      bg-gradient-to-r from-[#0F172A] to-[#1E3A5F]
   "
    >
      {/* decorative circles */}
      <div className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-white/[0.04] pointer-events-none" />
      <div className="absolute -bottom-10 left-[35%] w-44 h-44 rounded-full bg-white/[0.03] pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-white/15 bg-gradient-to-tr from-[#60A5FA] to-[#818CF8]">
            {name
              ?.split(" ")
              .map((i) => i[0])
              .join("")
              .toUpperCase() ?? ""}
          </div>
          {status === true ? (
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#0F172A]" />
          ) : (
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-red-600 rounded-full border-2 border-[#0F172A]" />
          )}
        </div>

        {/* info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-white text-2xl md:text-[1.75rem] font-bold tracking-tight">
              {name}
            </span>
            {status === true ? (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-green-400/65 bg-green-300/30 text-green-400 ">
                Active
              </span>
            ) : (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-red-400/65 bg-red-400/30 text-red-400 ">
                Inactive
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-6 gap-0.5">
            <span className="text-white/60 text-sm">{email}</span>
            <span className="text-white/60 text-sm">{phone ?? "--"}</span>
            <span className="text-white/40 text-sm">Patient ID: N/A</span>
          </div>
        </div>

        {/* edit button */}
        <button
          onClick={() => dispatch(setProfileDialogOpen())}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-300 text-white text-sm font-medium transition-all  bg-gray-200/20 hover:bg-gray-500 hover:scale-105"
        >
          <Pencil size={13} />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHero;
