import * as yup from "yup";

export const planSchema = yup.object({
  planname: yup.string().required("Plan duration is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  feature: yup.string().required(),
});
