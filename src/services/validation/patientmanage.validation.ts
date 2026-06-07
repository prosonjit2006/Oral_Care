// patientmanage.validation.ts
import * as yup from "yup";

export const patientSchema = yup.object({
  id: yup.string().optional(),
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
  image: yup.mixed<File | string>().nullable().optional(),
});

// export type PatientPayload = yup.InferType<typeof patientSchema>;
