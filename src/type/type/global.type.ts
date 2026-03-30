import type {
  AboutTeams,
  OurServices,
  ReviewsData,
} from "../interface/global.interface";

// for about Teams data

export type Props = {
  team: AboutTeams;
};

// for review data

export type ReviewProps = {
  direction?: "left" | "right";
  data: ReviewsData[];
};

export interface OurServiceCardType {
  item: OurServices;
}

export type BillingType = "monthly" | "quarterly" | "yearly";