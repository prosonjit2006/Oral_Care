import { tablesDB } from "../lib/Appwrite.config";

// fetching fns
export const fetchUserListFns = async () => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "user",
  });

  return response.rows;
};