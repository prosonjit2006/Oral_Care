import { ID, tablesDB } from "../lib/Appwrite.config";
import type { PlanPayload } from "../type/interface/plan.interface";

export const fetchPlanListFns = async () => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "plan",
  });

  // console.log("res from service data fetch", response);
  return response.rows;
};

export const addPlanFns = async (data: PlanPayload) => {
  const response = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "plan",
    rowId: ID.unique(),
    data: {
      planname: data.planname,
      description: data.description,
      price: data.price,
      status: false,
      feature: data.feature,
    },
  });

  // console.log("response from service func", response);
  return response;
};

export const editPlanFns = async ({
  id,
  data,
}: {
  id: string;
  data: PlanPayload;
}) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "plan",
    rowId: id,
    data: {
      planname: data.planname,
      description: data.description,
      price: data.price,
      feature: data.feature
    },
  });
//   console.log("res in service update fns", response);
  return response;
};

export const publishPlanFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "plan",
    rowId: id,
    data: {
      status: true,
    },
  });
  return response;
};

export const unpublishPlanFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "plan",
    rowId: id,
    data: {
      status: false,
    },
  });
  return response;
};

export const deletePlanFns = async (id: string) => {
  const response = await tablesDB.deleteRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "plan",
    rowId: id,
  });
  return response;
};
