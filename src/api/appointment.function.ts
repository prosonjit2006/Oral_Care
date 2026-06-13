import { ID, tablesDB } from "../lib/Appwrite.config";
import type { AppointmentPayload } from "../type/interface/appointment.interface";

export const fetchAppointmentListFns = async () => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "appointments",
  });

  //   console.log('fetch Appointment data', response)
  return response.rows;
};

export const addNewAppointmentFns = async (data: AppointmentPayload) => {
  const res = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "appointments",
    rowId: ID.unique(),
    data: {
      serviceTitle: data.serviceTitle,
      doctorId: Number(data.doctorId),
      doctorName: data.doctorName,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      patientPhone: data.patientPhone,
      message: data.message,
      status: true,
      userId: data.userId,
      //   userId: "",
    },
  });

  //   console.log("appointments", res);

  return res;
};

export const editAppointmentFns = async ({
  id,
  data,
}: {
  id: string;
  data: AppointmentPayload;
}) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "appointments",
    rowId: id,
    data: {
      serviceTitle: data.serviceTitle,
      doctorId: Number(data.doctorId),
      doctorName: data.doctorName,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      patientName: data.patientName,
      patientEmail: data.patientEmail,
      patientPhone: data.patientPhone,
      message: data.message,
    },
  });
  console.log("response of editAppointment from fns", response);
  return response;
};

export const deleteAppointmentFns = async (id: string) => {
  const response = await tablesDB.deleteRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "appointments",
    rowId: id,
  });

  console.log("response in the delete Appointment fns", response);
  return response;
};

export const publishAppointmentFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "appointments",
    rowId: id,
    data: {
      status: true,
    },
  });
  return response;
};

export const unpublishAppointmentFns = async (id: string) => {
  const response = await tablesDB.updateRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "appointments",
    rowId: id,
    data: {
      status: false,
    },
  });
  return response;
};
