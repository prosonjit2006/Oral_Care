import * as yup from "yup";

export const planSchema = yup.object({
  name: yup.string().required("Plan duration is required"),
  price: yup.string().required("Price is required"),
  description: yup.string().required("Description is required"),
  features: yup.string().required("Features is required"),
});
