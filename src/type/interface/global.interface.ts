export interface AboutTeams {
  name: string;
  position: string;
  rating: number;
  reviews: string;
  img: string;
}

export interface Props {
  team: AboutTeams;
}


export interface ReviewsData {
  id: number;
  type: "text" | "image";
  title?: string;
  description?: string;
  name?: string;
  role?: string;
  avatar?: string;
  image?: string;
}

export interface Props {
  item: ReviewsData;
}