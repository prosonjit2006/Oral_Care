import { ID, Query } from "appwrite";
import { tablesDB } from "../lib/Appwrite.config";
import type { BookingPayload } from "../type/interface/booking.interface";

export const fetchPatientDataFns = async (email: string) => {
  const rseponse = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    queries: [Query.equal("email", email)],
  });
  return rseponse.rows[0];
};

// service booking patient side
export const bookedServiceFns = async (data: BookingPayload) => {
  const response = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "appointments",
    rowId: ID.unique(),
    data: {
      patientId: data.patientId,
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      serviceName: data.serviceName,
      doctorName: data.doctorName,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      message: data.message,
      status: data.status,
    },
  });
  return response;
};