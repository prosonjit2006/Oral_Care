export interface Appointment {
  $id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  serviceName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  message: string;
  status: boolean;
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
  $id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  serviceName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  message: string;
  status: boolean;
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
