export interface Doctor {
  $id: string;
  name: string;
  specialization: string;
  rating: string;
  review: string;
  status: boolean;
  image: string;
  services?: string[];
}

export interface DoctorState {
  isLoading: boolean;
  isError: string | null;
  doctors: Doctor[];
  dialog: {
    open: boolean;
    selectedDoctor: Doctor | null;
  };
}

export interface DoctorPayload {
  id: string;
  name: string;
  specialization: string;
  rating: string;
  review: string;
}
