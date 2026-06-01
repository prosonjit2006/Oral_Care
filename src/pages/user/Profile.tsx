import ProfileHero from "../../Section/Profile/ProfileHero";
import ProfileInfo from "../../Section/Profile/ProfileInfo";
import ProfileAppointments from "../../Section/Profile/ProfileAppointments";
import ProfileNotifications from "../../Section/Profile/ProfileNotifications";
import ProfileSettings from "../../Section/Profile/ProfileSettings";
import ProfileOverview from "../../Section/Profile/ProfileOverview";
import {
  appointments,
  medicalInfo,
  notifications,
  personalInfo,
  quickActions,
  stats,
} from "../../services/json/profile.json";

// ─── Page

const Profile = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <ProfileHero
          name="Prosonjit Datta"
          email="prosonjitdatta2006@gmail.com"
          phone="+91 8509776694"
          patientId="OC-10234"
          initials="PD"
          isActive="true"
        />

        <ProfileOverview stats={stats} actions={quickActions} />

        <ProfileInfo
          personalInfo={personalInfo}
          medicalInfo={medicalInfo}
          bloodGroup="A+"
        />

        <ProfileAppointments appointments={appointments} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileNotifications notifications={notifications} />
          <ProfileSettings
            onChangePassword={() => console.log("change password")}
            onForgotPassword={() => console.log("forgot password")}
            onDeleteAccount={() => console.log("delete account")}
            onLogout={() => console.log("logout")}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
