import * as yup from "yup";

const newServicesSchema = yup.object({
  servicename: yup.string().required("Service Name is required"),
  description: yup.string().defined().default(""),
  image: yup.string().optional(),
});

export default newServicesSchema;
