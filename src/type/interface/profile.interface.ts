export interface StatItem {
  label: string;
  value: number;
  color: string;
  bg: string;
  border: string;
}

export interface Appointment {
  doctor: string;
  specialty: string;
  service: string;
  date: string;
  time: string;
  avatar: string;
  avatarColor: string;
  avatarBg: string;
  avatarBorder: string;
}

export interface QuickAction {
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  hover: string;
}

export interface InfoItem {
  label: string;
  value: string;
}

export interface NotificationItem {
  label: string;
  sub: string;
  icon: React.ElementType;
  checked: boolean;
}

// ! Till this part the interface is for the profile data type
// ? From hare the interface is for the slice

export interface Profile {
  $createdAt?: string;
  $databaseId?: string;
  $id?: string;
  $tableId?: string;
  $updatedAt?: string;
  address?: string;
  email?: string;
  gender?: string;
  image?: string;
  name?: string;
  password?: string;
  phone?: string;
  role?: string;
  dob?: string;
  status?: boolean;
}

export interface ProfileSate {
  isLoading: boolean;
  isError: string | null;

  patientData: Profile | null;

  dialog: {
    open: boolean;
    selectedProfile: Profile | null;
  };
}

interface Query {
  email: string;
  password: string;
}
export interface ProfilePayload {
  $id: string;
  query: Query;
}

export interface EditProfilePayload {
  name: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
}
