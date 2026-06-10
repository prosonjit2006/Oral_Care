import * as yup from 'yup'

export const doctorSchema = yup.object({
  name: yup.string().required("Name id required"),
  specialization: yup.string().required("Specialization is required"),
  rating: yup.string().optional(),
  review: yup.string().required()
});