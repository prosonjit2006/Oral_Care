import { tablesDB } from "../lib/Appwrite.config";

// fetching fns
export const fetchPaymentsRecordListFns = async () => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "bookinghistory",
  });

  console.log("fetch payments records data", response);
  return response.rows;
};


// // doctor table status change
// export const publishDoctorFns = async (id: string) => {
//   const response = await tablesDB.updateRow({
//     databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     tableId: "doctor",
//     rowId: id,
//     data: {
//       status: true,
//     },
//   });
//   return response;
// };

// export const unpublishDoctorFns = async (id: string) => {
//   const response = await tablesDB.updateRow({
//     databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     tableId: "doctor",
//     rowId: id,
//     data: {
//       status: false,
//     },
//   });
//   return response;
// };
