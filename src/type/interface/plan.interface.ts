// interface Features {
//   id: string;
//   label: string;
// }

export interface Plan {
  $id: string;
  planname: string;
  description: string;
  price: number;
  status: boolean;
  feature: string;
}

export interface PlanState {
  isLoading: boolean;
  isError: string | null;
  plans: Plan[];

  dialog: {
    open: boolean;
    selectedPlan: Plan | null;
  };
}

export interface PlanPayload {
  $id?: string
  planname: string;
  description: string;
  price: number;
  feature: string;
}
