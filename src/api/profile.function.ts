import { Query } from "appwrite";
import { tablesDB } from "../lib/Appwrite.config";
import type { EditProfilePayload } from "../type/interface/profile.interface";

export const fetchPatientDataFns = async (email: string) => {
  const rseponse = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    queries: [Query.equal("email", email)],
  });
  return rseponse.rows[0];
};

export const updatePatientProfileFns = async ({
  email,
  data,
}: {
  email: string;
  data: EditProfilePayload;
}) => {
  // Find patient by email
  const patient = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    queries: [Query.equal("email", email)],
  });

  if (!patient.rows.length) {
    throw new Error("Patient not found");
  }

  // Get row id
  const rowId = patient.rows[0].$id; // check console if it's $id or $rowId

  // Update profile
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    rowId,
    data: {
      name: data.name,
      phone: data.phone,
      gender: data.gender,
      dob: data.dob,
      address: data.address,
    },
  });

  return response;
};
