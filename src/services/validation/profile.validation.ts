import * as yup from "yup";

export const editProfileSchema = yup.object({
  // name: yup.string().required('Name is required'),
  name: yup.string(),
  phone: yup.string(),
  gender: yup.string(),
  dob: yup.string(),
  address: yup.string(),
});
