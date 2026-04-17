import * as yup from "yup";

const newServicesSchema = yup.object({
  servicename: yup.string().required("Service Name is required"),
  description: yup.string().optional(),
  // imgurl: yup.string().optional(),
  uploadimg: yup.mixed().optional(),
});

export default newServicesSchema;
