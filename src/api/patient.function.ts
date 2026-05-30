import { tablesDB } from "../lib/Appwrite.config";
import type { PatientPayload } from "../type/interface/patient.interface";

export const fetchPatientListFns = async () => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
  });

  //   console.log('fetch patient data', response)
  return response.rows;
};

export const publishPatientFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    rowId: id,
    data: {
      status: true,
    },
  });
  return response;
};

export const unpublishPatientFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    rowId: id,
    data: {
      status: false,
    },
  });
  return response;
};

export const editPatientFns = async ({
  id,
  data,
}: {
  id: string;
  data: PatientPayload;
}) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    rowId: id,
    data: {
      nane: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      image: data.image,
    },
  });
  console.log("response of editPatient from fns", response);
  return response;
};

export const deletePatientFns = async (id: string) => {
  const response = await tablesDB.deleteRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    rowId: id,
  });

  console.log("response in the delete patient fns", response);
  return response;
};
