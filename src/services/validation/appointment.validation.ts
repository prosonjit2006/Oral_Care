import * as yup from "yup";

export const appointmentSchema = yup.object({
  serviceTitle: yup.string().required("Service title is required"),
  doctorName: yup.string().required("Doctor name is required"),
  appointmentDate: yup.string().required("Appointment date is required"),
  appointmentTime: yup.string().required("Appointment time is required"),
  patientName: yup.string().required("Patient name is required"),
  patientEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("Patient email is required"),
  patientPhone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Patient phone number is required"),
});
