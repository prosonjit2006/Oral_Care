import { account, bucket, ID, tablesDB } from "../lib/Appwrite.config";
import type { PatientPayload } from "../type/interface/patient.interface";


export const fetchPatientListFns = async () => {
  const response = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
  });

  //   console.log('fetch patient data', response)
  return response.rows;
};

export const addNewPatientFns = async (data: PatientPayload) => {
  const newPatient = await account.create({
    userId: ID.unique(),
    email: data.email,
    password: data.password,
    name: data.name,
  });
  console.log("newPatient ", newPatient);

  let imageUrl;
  if (data.image) {
    console.log("upcoming image", data.image);

     if (!(data.image instanceof File)) {
       throw new Error("Image must be a File object, not a URL string");
     }

    const uploadImage = await bucket.createFile({
      bucketId: import.meta.env.VITE_BUCKET_ID,
      fileId: ID.unique(),
      file: data.image,
    });

    console.log("upload img", uploadImage);
    const viewImage = bucket.getFileView({
      bucketId: import.meta.env.VITE_BUCKET_ID,
      fileId: uploadImage.$id,
    });

    // console.log("vew img", viewImage);
    imageUrl = viewImage;
  }

  // ! This is user table data
  const user = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "user",
    rowId: ID.unique(),
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "user",
      image: imageUrl,
    },
  });

  console.log('res in fnc user', user)

  const patient = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    rowId: ID.unique(),
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "patient",
      phone: data.phone,
      address: data.address,
      image: imageUrl,
    },
  });

  console.log("patient", patient);

  return patient;
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
      name: data.name,
      phone: data.phone,
      address: data.address,
      // image: data.image,
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
