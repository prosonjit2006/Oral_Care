import * as yup from "yup";

export const bookingFormSchema = yup.object({
  service: yup.string().required("Service selection is required"),
  doctor: yup.object().nullable().required("Doctor selection also required"),
  datetime: yup
    .object()
    .nullable()
    .required("Date & Time selection also required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .min(10, "minumum 10 digit required"),
  message: yup.string().optional(),
});
