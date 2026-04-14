import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required("Email is required").email(),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^([A-Z])/, "Password should be containt 1 upper")
    .min(6, "Password should be 6 character long"),
});

export default loginSchema;
