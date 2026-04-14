import * as yup from "yup";

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^([A-Z])/, "Password should be containt 1 upper")
    .min(6, "Password should be 6 character long"),
  confirmpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf(
      [yup.ref("password")],
      "Confirm Password should be matched with password",
    ),
});

export default signupSchema;
