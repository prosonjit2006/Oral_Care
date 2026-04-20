import type { LucideIcon } from "lucide-react";
import type { BillingType } from "../type/global.type";

export interface AboutTeams {
  id: number
  name: string;
  position: string;
  rating: number;
  reviews: string;
  img: string;
}

export interface ReviewsData {
  id: number;
  key?: number | string;
  type: "text" | "image";
  title?: string;
  description?: string;
  name?: string;
  role?: string;
  avatar?: string;
  image?: string;
}

export interface DentalService {
  id: number;
  title: string;
  image: string;
}

export interface OurServices {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  height?: string;
}



export interface PlanFeature {
  id: string;
  label: string;
}

export interface Plan {
  id: BillingType;
  title: string;
  price: number;
  durationLabel: string; 
  description: string;
  features: PlanFeature[];
  isRecommended?: boolean;
}