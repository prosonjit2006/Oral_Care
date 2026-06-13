export interface Appointment {
  $id: string;
  $createdAt: string;
  serviceTitle: string;
  doctorId: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  message: string;
  status: boolean;
  userId: string;
}

export interface AppointmentState {
  isLoading: boolean;
  isError: string | null;

  Appointments: Appointment[];

  dialog: {
    open: boolean;
    selectedAppointment: Appointment | null;
  };
}

export interface AppointmentPayload {
    id: string
  serviceTitle: string;
  doctorId: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  message: string;
  status: boolean;
  userId: string;
}

/**
  serviceTitle: select dropdown
  doctorName: // ? just show the available doctor on the dropdown
  doctorId: number; - // * doctor id from the doctor select 
  appointmentDate: dropdown
  appointmentTime: dropdown
  patientName: string; // inp
  patientEmail: string; // inp
  patientPhone: string; // inp
  message: string; // inp
  status: boolean; //! initially false - but in this case it would be difucult to handel the pending, accepted & rejected
  userId?: string; optional 
 */
