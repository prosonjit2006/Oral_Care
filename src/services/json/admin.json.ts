import type { FormInput, SidebarNavigationInterface } from "../../type/interface/admin.interface";

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
    path: "/admin",
  },
  {
    id: 2,
    name: "Services",
    path: "/admin/servicesmanage",
  },
  {
    id: 3,
    name: "Appointment",
    path: "/admin/appointmentmanage",
  },
  {
    id: 4,
    name: "Plan",
    path: "/admin/planmanage",
  },
  {
    id: 5,
    name: "Users",
    path: "/admin/usersmanage",
  },
  {
    id: 6,
    name: "Settings",
    path: "/admin/systemsettings",
  },
];