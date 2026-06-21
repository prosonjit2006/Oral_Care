import * as yup from "yup";

export const appointmentSchema = yup.object({
  patientId: yup.string().required("Please select a patient"),

  patientName: yup.string().required("Patient name is required"),

  patientEmail: yup
    .string()
    .email("Invalid email")
    .required("Patient email is required"),

  serviceName: yup.string().required("Please select a service"),

  doctorName: yup.string().required("Please select a doctor"),

  appointmentDate: yup.string().required("Please select an appointment date"),

  appointmentTime: yup.string().required("Please select an appointment time"),

  message: yup.string().optional(),

  status: yup.boolean().required(),
});
