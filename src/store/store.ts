import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import doctorReducer from "./slices/doctor.slice";
import patientReducer from "./slices/patient.slice";
import serviceReducer from "./slices/service.slice";
import planReducer from "./slices/plan.slice";
import profileReducer from "./slices/profile.slice";
import bookingReducer from "./slices/booking.slice";
import appointmentReducer from "./slices/appointment.slice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    service: serviceReducer,
    plan: planReducer,
    profile: profileReducer,
    booking: bookingReducer,
    appointment: appointmentReducer,
  },
});
