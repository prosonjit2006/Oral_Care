import type { AboutTeams, ReviewsData } from "../interface/global.interface";

// for about Teams data

export type Props = {
  team: AboutTeams;
};

// for review data

export type ReviewProps = {
  direction?: "left" | "right";
  data: ReviewsData[];
};
