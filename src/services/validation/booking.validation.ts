import * as yup from "yup";

const bookingFormSchema = yup.object({
  service: yup.string().required("Service is required"),
  doctor: yup
    .object({
      id: yup.number().required(),
      name: yup.string().required(),
      position: yup.string().required(),
    })
    .required("Doctor is required"),
  datetime: yup
    .object({
      doctorId: yup.number().required(),
      date: yup.string().required(),
      time: yup.string().required(),
    })
    .required("Date & time is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  message: yup.string().defined().default(""),
});

export type FormValues = yup.InferType<typeof bookingFormSchema>;
export { bookingFormSchema };
 

 // ! new schema 
// import * as yup from 'yup'

// export const bookingFormSchema = yup.object({
//   service:  yup.string().required("Please select a service"),
//   doctor:   yup.object({ id: yup.number().required(), name: yup.string().required() }).required("Please select a doctor"),
//   datetime: yup.object({ doctorId: yup.number(), date: yup.string(), time: yup.string() }).required("Please select a time"),
//   name:     yup.string().required("Full name is required"),
//   email:    yup.string().email("Invalid email").required("Email is required"),
//   phone:    yup.string().required("Phone number is required"),
//   gender:   yup.string().required("Gender is required"),
//   dob:      yup.string().required("Date of birth is required"),
//   address:  yup.string().required("Address is required"),
//   message:  yup.string().optional(),
// });

// export type FormValues = yup.InferType<typeof bookingFormSchema>;