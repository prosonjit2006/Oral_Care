import { Droplets, User, Hospital } from "lucide-react";
import { Card, SectionHeader, InfoRow, Divider } from "./Ui";
import type { InfoItem, Profile } from "../../type/interface/profile.interface";

interface ProfileInfoProps {
  personalInfo: Profile;
  medicalInfo: InfoItem[];
  bloodGroup: string;
}

const ProfileInfo = ({
  personalInfo,
  medicalInfo,
  bloodGroup,
}: ProfileInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* personal */}
      <Card className="p-5">
        <SectionHeader
          icon={User}
          title="Personal Information"
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <Divider className="mb-4" />
        <div className="space-y-1">
          <InfoRow label="Full Name" value={personalInfo?.name ?? "N/A"} />
          <InfoRow label="Email" value={personalInfo?.email ?? "N/A"} />
          <InfoRow label="Phone" value={personalInfo?.phone ?? "N/A"} />
          <InfoRow label="Gender" value={personalInfo?.gender ?? "N/A"} />
          <InfoRow label="Date of Birth" value={personalInfo?.dob ?? "N/A"} />
          <InfoRow label="Address" value={personalInfo?.address ?? "N/A"} />
          <InfoRow
            label="Joined"
            value={
              personalInfo?.$createdAt
                ? new Date(personalInfo.$createdAt).toLocaleDateString()
                : "N/A"
            }
          />
        </div>
      </Card>

      {/* medical */}
      <Card className="p-5">
        <SectionHeader
          icon={Hospital}
          title="Medical Information"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <Divider className="mb-4" />

        {/* blood group highlight */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 mb-3">
          <div className="w-9 h-9 rounded-lg bg-white border border-red-100 flex items-center justify-center flex-shrink-0">
            <Droplets size={16} className="text-red-500" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-medium">Blood Group</p>
            <p className="text-red-600 font-bold text-sm">{bloodGroup}</p>
          </div>
        </div>

        <div className="space-y-1">
          {medicalInfo.map((r) => (
            <InfoRow key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProfileInfo;
