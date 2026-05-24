import { ID, tablesDB } from "../lib/Appwrite.config";
import type { ServicePayload } from "../type/interface/service.interface";

export const fetchServiceListFns = async () => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "service",
  });

  // console.log("res from service data fetch", response);
  return response.rows;
};

export const addServiceFns = async (data: ServicePayload) => {
  const response = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "service",
    rowId: ID.unique(),
    data: {
      servicename: data.servicename,
      description: data.description,
      status: false,
      image: data.image,
    },
  });

  // console.log("response from service func", response);
  return response;
};

export const editServiceFns = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "service",
    rowId: id,
    data: {
      servicename: data.servicename,
      description: data.description,
      image: data.image,
    },
  });
  console.log("res in service update fns", response);
  return response;
};

export const publishServiceFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "service",
    rowId: id,
    data: {
      status: true,
    },
  });
  return response;
};

export const unpublishServiceFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "service",
    rowId: id,
    data: {
      status: false,
    },
  });
  return response;
};

export const deleteServiceFns = async (id: string) => {
  const response = await tablesDB.deleteRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "service",
    rowId: id,
  });
  return response;
};