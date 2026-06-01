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
