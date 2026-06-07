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
