import type { PlanInterface } from "../../type/interface/admin.interface";

export const planInputField: PlanInterface[] = [
  {
    name: "name",
    label: "Plan Duration",
    placeholder: "Enter plan duration eg-Monthly,Yearly",
    type: "text",
    rows: 1,
    required: true,
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter plan price",
    type: "number",
    rows: 1,
    required: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter plan description",
    type: "text",
    rows: 1,
    required: true,
  },
  {
    name: "features",
    label: "Features",
    placeholder: "Enter plan features",
    type: "textarea",
    rows: 3,
    required: true,
  },
];
