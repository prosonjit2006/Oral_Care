export interface Patient {
    $id: string
  name: string;
  email: string;
  role: string;
  address: string;
  phone: string;
  image: string;
}

export interface PatientState {
  isLoading: boolean;
  isError: string | null;

  patients: Patient[];

  dialog: {
    open: boolean;
    selectedPatient: Patient | null;
  };
}

export interface PatientPayload {
    name: string
    email: string
    phone: string
    address: string
    image:  string
}
