import * as yup from "yup";

const newServicesSchema = yup.object({
  servicename: yup.string().required("Service Name is required"),
  description: yup.string().required("Description is required"),
  status: yup.boolean().required(),
  image: yup.string().required("Image is required"),
});

export default newServicesSchema;
