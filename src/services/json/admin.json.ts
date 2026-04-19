import {
  ChartGantt,
  ClipboardClock,
  LayoutDashboard,
  ServerCog,
  Settings,
  Users,
} from "lucide-react";
import type {
  FormInput,
  SidebarNavigationInterface,
} from "../../type/interface/admin.interface";

// signup data
export const signupInputForm: FormInput[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter Your Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email Address",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter Your Phone Number",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    type: "password",
  },
  {
    name: "confirmpassword",
    label: "Confirm Password",
    placeholder: "Enter Confirm Password",
    type: "password",
  },
];

// login data
export const loginInputForm: FormInput[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email Address",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    type: "password",
  },
];

// admin sidebar
export const sidebarNavigation: SidebarNavigationInterface[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "Services",
    path: "/admin/servicesmanage",
    icon: ServerCog,
  },
  {
    id: 3,
    name: "Appointment",
    path: "/admin/appointmentmanage",
    icon: ClipboardClock,
  },
  {
    id: 4,
    name: "Plan",
    path: "/admin/planmanage",
    icon: ChartGantt,
  },
  {
    id: 5,
    name: "Users",
    path: "/admin/usersmanage",
    icon: Users,
  },
  {
    id: 6,
    name: "Settings",
    path: "/admin/systemsettings",
    icon: Settings,
  },
];

// service inputfield
export const serviceInputField = [
  {
    name: "servicename",
    label: "Service Name",
    placeholder: "Enter new service name",
    type: "text",
    required: true,
    rows: 1,
  },
  {
    name: "description",
    label: "Add Description",
    placeholder: "Add your service description here",
    type: "textarea",
    required: false,
    rows: 3,
  },
];

// doctor avavilability
export const doctorAvailability = [
  {
    doctorId: 1,
    availability: [
      {
        date: "2026-04-20",
        slots: ["10:00 AM", "11:30 AM", "02:00 PM"],
      },
      {
        date: "2026-04-22",
        slots: ["09:00 AM", "01:00 PM"],
      },
    ],
  },
  {
    doctorId: 2,
    availability: [
      {
        date: "2026-04-21",
        slots: ["10:30 AM", "12:00 PM"],
      },
      {
        date: "2026-04-23",
        slots: ["03:00 PM", "05:00 PM"],
      },
    ],
  },
  {
    doctorId: 3,
    availability: [
      {
        date: "2026-04-20",
        slots: ["08:00 AM", "11:00 AM"],
      },
      {
        date: "2026-04-24",
        slots: ["01:30 PM", "04:00 PM"],
      },
    ],
  },
  {
    doctorId: 4,
    availability: [
      {
        date: "2026-04-22",
        slots: ["09:30 AM", "12:30 PM"],
      },
      {
        date: "2026-04-25",
        slots: ["02:00 PM", "06:00 PM"],
      },
    ],
  },
  {
    doctorId: 5,
    availability: [
      {
        date: "2026-04-21",
        slots: ["10:00 AM", "01:00 PM"],
      },
      {
        date: "2026-04-23",
        slots: ["03:30 PM", "07:00 PM"],
      },
    ],
  },
];