import {
  CalendarDays,
  History,
  BarChart2,
  Pill,
  Bell,
  Mail,
  MessageSquare,
} from "lucide-react";

import type {
  StatItem,
  Appointment,
  QuickAction,
  InfoItem,
  NotificationItem,
} from "../../type/interface/profile.interface";

export const stats: StatItem[] = [
  {
    label: "Upcoming",
    value: 3,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    label: "Completed",
    value: 12,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    label: "Reports",
    value: 4,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    label: "Prescriptions",
    value: 2,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

export const quickActions: QuickAction[] = [
  {
    label: "Book Appointment",
    icon: CalendarDays,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    hover: "hover:bg-blue-100",
  },
  {
    label: "Medical History",
    icon: History,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    hover: "hover:bg-emerald-100",
  },
  {
    label: "Reports",
    icon: BarChart2,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    hover: "hover:bg-violet-100",
  },
  {
    label: "Prescriptions",
    icon: Pill,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    hover: "hover:bg-amber-100",
  },
];

export const personalInfo: InfoItem[] = [
  { label: "Full Name", value: "Prosonjit Datta" },
  { label: "Email", value: "prosonjitdatta2006@gmail.com" },
  { label: "Phone", value: "+91 8509776694" },
  { label: "Gender", value: "Male" },
  { label: "Date of Birth", value: "08 Aug 2006" },
  { label: "Address", value: "West Bengal, India" },
];

export const medicalInfo: InfoItem[] = [
  { label: "Allergies", value: "None" },
  { label: "Medication", value: "No Active Medication" },
  { label: "Smoking Status", value: "Non-Smoker" },
  { label: "Medical Conditions", value: "No Known Conditions" },
];

export const appointments: Appointment[] = [
  {
    doctor: "Dr. Sarah Wilson",
    specialty: "Dentist",
    service: "Dental Cleaning",
    date: "12 June 2026",
    time: "10:00 AM",
    avatar: "SW",
    avatarColor: "text-blue-600",
    avatarBg: "bg-blue-50",
    avatarBorder: "border-blue-200",
  },
  {
    doctor: "Dr. Michael Brown",
    specialty: "General",
    service: "Tooth Checkup",
    date: "20 June 2026",
    time: "02:30 PM",
    avatar: "MB",
    avatarColor: "text-violet-600",
    avatarBg: "bg-violet-50",
    avatarBorder: "border-violet-200",
  },
];

export const notifications: NotificationItem[] = [
  {
    label: "Appointment Reminders",
    sub: "Get notified 24h before",
    icon: Bell,
    checked: true,
  },
  {
    label: "Email Notifications",
    sub: "Updates via email",
    icon: Mail,
    checked: true,
  },
  {
    label: "SMS Notifications",
    sub: "Updates via SMS",
    icon: MessageSquare,
    checked: false,
  },
];
