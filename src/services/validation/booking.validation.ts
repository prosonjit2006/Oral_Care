import * as yup from "yup";

const bookingFormSchema = yup.object({
  service: yup.string().required("Service is required"),
  doctor: yup
    .object({
      id: yup.number().required(),
      name: yup.string().required(),
      position: yup.string().required(),
    })
    .required("Doctor is required"),
  datetime: yup
    .object({
      doctorId: yup.number().required(),
      date: yup.string().required(),
      time: yup.string().required(),
    })
    .required("Date & time is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  message: yup.string().defined().default(""),
});

export type FormValues = yup.InferType<typeof bookingFormSchema>;
export { bookingFormSchema };
