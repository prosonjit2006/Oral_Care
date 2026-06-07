export interface Patient {
  $id: string;
  name: string;
  email: string;
  password: string;
  status: boolean;
  gender: string;
  role: string;
  address: string;
  phone: string;
  image: string;
}

export interface PatientState {
  isLoading: boolean;
  isError: string | null;

  patients: Patient[];
  imagePreview: string | null;

  dialog: {
    open: boolean;
    selectedPatient: Patient | null;
  };
}

export interface PatientPayload {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  image?: File | string | null;
}
