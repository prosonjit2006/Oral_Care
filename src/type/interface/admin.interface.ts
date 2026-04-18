import type { LucideIcon } from "lucide-react";

export interface FormInput {
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

// sidebar navigation

export interface SidebarNavigationInterface {
  id: number;
  name: string;
  path: string;
  icon: LucideIcon;
}

export interface PlanInterface {
  name: string;
  label: string;
  placeholder: string;
  rows: number
  type: string;
  required: boolean;
}
