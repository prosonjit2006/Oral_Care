import * as yup from "yup";

const newServicesSchema = yup.object({
  servicename: yup.string().required("Service Name is required"),
  description: yup.string().defined().default(""),
  uploadimg: yup.mixed().defined().default(""),
  // imgurl: yup.string().optional(),
});

export type NewServicesType = yup.InferType<typeof newServicesSchema>;

export default newServicesSchema;
