import { ID, tablesDB } from "../lib/Appwrite.config";
import type { ServicePayload } from "../type/interface/service.interface";

// export const fetchServiceListFns = async()=> {
//     const response = await account.get()
// }

export const addServiceFns = async (data: ServicePayload) => {
  const response = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "service",
    rowId: ID.unique(),
  });

  console.log("response from service func", response);
};
