import { useState } from "react";
import {
  Building2,
  CreditCard,
  CalendarClock,
  Bell,
  ShieldCheck,
  Upload,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

const tabs = [
  { id: "general", label: "General Profile", icon: Building2 },
  { id: "billing", label: "Billing & Stripe", icon: CreditCard },
  { id: "scheduling", label: "Appointments", icon: CalendarClock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "staff", label: "Staff Roles", icon: ShieldCheck },
];

// Small reusable toggle switch
const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
      checked ? "bg-[#1D9E75]" : "bg-slate-700"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

// Reusable labeled input
const Field = ({
  label,
  placeholder,
  defaultValue,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-gray-400">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="h-11 rounded-lg border border-gray-700 bg-slate-900/60 px-3 text-sm text-gray-100 placeholder:text-gray-600 outline-none transition-colors focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/40"
    />
  </div>
);

const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-8">
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <p className="mt-1 text-sm text-gray-400">{description}</p>
  </div>
);

const SettingRow = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-800/60 py-4 last:border-b-0">
    <div>
      <p className="text-sm font-medium text-gray-100">{label}</p>
      <p className="mt-0.5 text-xs text-gray-500">{description}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  // Notification toggles state
  const [notifications, setNotifications] = useState({
    newBooking: true,
    cancellation: true,
    paymentReceived: true,
    dailySummary: false,
    smsReminders: true,
  });

  const toggleNotif = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  // Staff list state
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Jone Doe",
      role: "Admin",
      email: "jonedoe@oralcare.com",
    },
    {
      id: 2,
      name: "Anika Gupta",
      role: "Front Desk",
      email: "anikagupta@oralcare.com",
    },
  ]);

  return (
    <div className="flex w-full text-gray-200">
      {/* Inner settings sidebar */}
      <div className="w-64 shrink-0 border-r border-gray-800/50 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Settings</h2>
        <nav className="flex flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-[#1D9E75]/15 font-medium text-[#3DD9A4]"
                    : "text-gray-400 hover:bg-slate-800/40 hover:text-gray-200"
                }`}
              >
                <Icon size={16} className="shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="w-full max-w-4xl">
          <div className="rounded-xl border border-gray-800 bg-[#151c28] p-6">
            {/* GENERAL PROFILE */}
            {activeTab === "general" && (
              <div>
                <SectionHeader
                  title="Clinic Profile"
                  description="Manage your public-facing clinic information."
                />

                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-xs text-gray-500">
                    Logo
                  </div>
                  <button className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-xs font-medium text-gray-300 hover:border-[#1D9E75] hover:text-[#3DD9A4]">
                    <Upload size={14} />
                    Upload logo
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Clinic Name"
                    defaultValue="Oral Care Dental Clinic"
                  />
                  <Field label="Contact Email" defaultValue="oralcare@gmail.com" />
                  <Field label="Phone Number" defaultValue="+91 98765 43210" />
                  <Field label="Website" placeholder="https://oralcare.com" />
                  <div className="md:col-span-2">
                    <Field
                      label="Clinic Address"
                      defaultValue="123 MG Road, Kolkata, West Bengal"
                    />
                  </div>
                  <Field
                    label="Operating Hours — Open"
                    defaultValue="09:00 AM"
                  />
                  <Field
                    label="Operating Hours — Close"
                    defaultValue="08:00 PM"
                  />
                </div>
              </div>
            )}

            {/* BILLING & STRIPE */}
            {activeTab === "billing" && (
              <div>
                <SectionHeader
                  title="Billing Configuration"
                  description="Manage Stripe keys, currency, and invoice formats."
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Stripe Publishable Key"
                    placeholder="pk_live_••••••••••"
                  />
                  <Field
                    label="Stripe Secret Key"
                    placeholder="sk_live_••••••••••"
                    type="password"
                  />
                  <Field
                    label="Webhook Endpoint Secret"
                    placeholder="whsec_••••••••••"
                    type="password"
                  />
                  <Field label="Default Currency" defaultValue="INR" />
                  <Field label="Tax Rate (%)" defaultValue="18" />
                  <Field label="Invoice Prefix" defaultValue="OC-INV-" />
                </div>

                <div className="mt-6 rounded-lg border border-[#1D9E75]/30 bg-[#1D9E75]/5 px-4 py-3 text-xs text-[#3DD9A4]">
                  Stripe is currently connected and processing live payments.
                </div>
              </div>
            )}

            {/* APPOINTMENTS / SCHEDULING */}
            {activeTab === "scheduling" && (
              <div>
                <SectionHeader
                  title="Appointment Rules"
                  description="Control how booking slots and scheduling behave."
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Default Slot Duration (mins)"
                    defaultValue="30"
                  />
                  <Field
                    label="Buffer Between Appointments (mins)"
                    defaultValue="10"
                  />
                  <Field
                    label="Max Bookings Per Day (per doctor)"
                    defaultValue="16"
                  />
                  <Field
                    label="Booking Lead Time (hrs in advance)"
                    defaultValue="2"
                  />
                  <Field label="Cancellation Window (hrs)" defaultValue="24" />
                  <Field label="Booking Amount (₹)" defaultValue="200" />
                </div>

                <div className="mt-6 rounded-lg border border-gray-800/60">
                  <SettingRow
                    label="Allow online self-booking"
                    description="Patients can book appointments directly from the website."
                    checked={notifications.newBooking}
                    onChange={() => toggleNotif("newBooking")}
                  />
                  <SettingRow
                    label="Require payment to confirm"
                    description="Appointment status stays pending until booking amount is paid."
                    checked={notifications.paymentReceived}
                    onChange={() => toggleNotif("paymentReceived")}
                  />
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div>
                <SectionHeader
                  title="Notification Preferences"
                  description="Choose what triggers an alert to your team."
                />

                <div className="rounded-lg border border-gray-800/60 px-4">
                  <SettingRow
                    label="New booking alerts"
                    description="Get notified when a patient books an appointment."
                    checked={notifications.newBooking}
                    onChange={() => toggleNotif("newBooking")}
                  />
                  <SettingRow
                    label="Cancellation alerts"
                    description="Get notified when a patient cancels."
                    checked={notifications.cancellation}
                    onChange={() => toggleNotif("cancellation")}
                  />
                  <SettingRow
                    label="Payment received"
                    description="Get notified when a Stripe payment succeeds."
                    checked={notifications.paymentReceived}
                    onChange={() => toggleNotif("paymentReceived")}
                  />
                  <SettingRow
                    label="Daily summary email"
                    description="Receive a daily digest of bookings and revenue."
                    checked={notifications.dailySummary}
                    onChange={() => toggleNotif("dailySummary")}
                  />
                  <SettingRow
                    label="SMS reminders to patients"
                    description="Send automatic SMS reminders 24 hours before appointments."
                    checked={notifications.smsReminders}
                    onChange={() => toggleNotif("smsReminders")}
                  />
                </div>
              </div>
            )}

            {/* STAFF ROLES */}
            {activeTab === "staff" && (
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Staff & Roles
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Manage who has access to the admin panel.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setStaff((prev) => [
                        ...prev,
                        {
                          id: prev.length + 1,
                          name: "New Staff Member",
                          role: "Front Desk",
                          email: "",
                        },
                      ])
                    }
                    className="flex items-center gap-1.5 rounded-lg bg-[#1D9E75] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0F6E56]"
                  >
                    <Plus size={14} />
                    Add Staff
                  </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-800/60">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-800/60 bg-slate-900/40 text-xs uppercase tracking-wide text-gray-500">
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map((member) => (
                        <tr
                          key={member.id}
                          className="border-b border-gray-800/40 last:border-b-0"
                        >
                          <td className="px-4 py-3 text-gray-100">
                            {member.name}
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-[#1D9E75]/15 px-2.5 py-1 text-xs font-medium text-[#3DD9A4]">
                              {member.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400">
                            {member.email}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() =>
                                setStaff((prev) =>
                                  prev.filter((s) => s.id !== member.id),
                                )
                              }
                              className="text-gray-500 hover:text-red-400"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Save bar — shown on every tab */}
            <div className="mt-8 flex justify-end border-t border-gray-800/60 pt-5">
              <button className="flex items-center gap-2 rounded-lg bg-[#1D9E75] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F6E56] active:scale-[0.98]">
                <Save size={15} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
