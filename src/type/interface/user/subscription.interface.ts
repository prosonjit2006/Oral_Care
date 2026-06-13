export interface Subscription {
  $id: string;
  description: string;
  feature: string;
  planname: string;
  price: number;
  status: boolean;
}

export interface SubscriptionState {
  plans: Subscription[];
}
