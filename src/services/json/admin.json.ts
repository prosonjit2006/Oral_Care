import type { FormInput } from "../../type/interface/admin.interface";

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
    type: "number",
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
