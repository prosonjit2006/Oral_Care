import type { LucideIcon } from "lucide-react";


export interface AboutTeams {
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
  icon: LucideIcon ;
  bgColor: string;
  height?: string
}


