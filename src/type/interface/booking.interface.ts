import type { Patient } from "./patient.interface";

export interface BookingServiceType {
  id: number;
  title: string;
  img?: string;
  description?: string;
}

export interface BookingDoctorType {
  id: number;
  name: string;
  position: string;
  rating: number;
  reviews: string;
  img: string;
}

export interface BookingTimeType {
  availability: {
    date: string;
    slots: string[];
  }[];
  id: number;
  name: string;
  position: string;
  rating: number;
  reviews: string;
  img: string;
}

export interface BookingPersonalDetailsType {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  rows: number;
  required: boolean;
}

// ! actual booking interface from here upper part is the ststic data type

export interface Booking {
  id: string;
}

export interface BookingState {
  isLoading: boolean;
  isError: string | null;
  patient: Patient | null;
}

export interface BookingPayload {
  serviceTitle: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  message: string;
  status: boolean;
  userId: string | null;
}
