import { ID, tablesDB } from "../lib/Appwrite.config";
import type { DoctorPayload } from "../type/interface/doctor.interface";

// fetching fns
export const fetchDoctorListFns = async () => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "doctor",
  });

  //   console.log('fetch Doctor data', response)
  return response.rows;
};

// addDoctor fns
export const addNewDoctorFns = async (data: DoctorPayload) => {
  const res = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "doctor",
    rowId: ID.unique(),
    data: {
      name: data.name,
      specialization: data.specialization,
      status: false,
      rating: data.rating,
      review: data.review,
      image: ""
    },
  });

  console.log("Doctor", res);

  return res;
};

// editDoctor fns
export const editDoctorFns = async ({
  id,
  data,
}: {
  id: string;
  data: DoctorPayload;
}) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "doctor",
    rowId: id,
    data: {
      name: data.name,
      specialization: data.specialization,
      rating: data.rating,
      review: data.review,
    },
  });
  console.log("response of editDoctor from fns", response);
  return response;
};

// deleteDoctor fns
export const deleteDoctorFns = async (id: string) => {
  const response = await tablesDB.deleteRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "doctor",
    rowId: id,
  });

  console.log("response in the delete Doctor fns", response);
  return response;
};

// doctor table status change
export const publishDoctorFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "doctor",
    rowId: id,
    data: {
      status: true,
    },
  });
  return response;
};

export const unpublishDoctorFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "doctor",
    rowId: id,
    data: {
      status: false,
    },
  });
  return response;
};
