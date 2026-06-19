import { Query } from "appwrite";
import { account, bucket, ID, tablesDB } from "../lib/Appwrite.config";
import type {
  LoginPayload,
  SignupPayload,
} from "../type/interface/auth.interface";
import Cookies from 'js-cookie'

export const registerUserfns = async (data: SignupPayload) => {
  const userAuth = await account.create({
    userId: ID.unique(),
    email: data.email,
    password: data.password,
    name: data.name,
  });
  console.log("userauth", userAuth);

  let imageUrl;
  if (data.image) {
    // console.log("comeing image", data.image);

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

  const patient = await tablesDB.createRow({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "patient",
    rowId: ID.unique(),
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "patient",
      phone: "",
      address: "",
      image: imageUrl,
    },
  });

  console.log("patient", patient);

  return user;
};

export const loginUserfns = async (data: LoginPayload) => {
  console.log("data coming in loginfns", data);
  const findUser = await tablesDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: "user",
    queries: [Query.equal("email", [data.email])],
  });

  console.log("find user", findUser);
  
  if (findUser.rows.length > 0) {
    await account.createEmailPasswordSession({
      email: data.email,
      password: data.password,
    });
    
    console.log("row list", findUser.rows);
    console.log("email", findUser.rows[0].email);

    // ! based on the user email fetch the patient data and store it on the cookies 
     const patient = await tablesDB.listRows({
       databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
       tableId: "patient",
       queries: [Query.equal("email", findUser.rows[0].email)],
     });

     console.log('patient', patient)

     if(patient){
      Cookies.set('patient', JSON.stringify(patient.rows[0]))
     }

    return {
      success: true,
      message: "Login Successfully",
      user: findUser?.rows?.[0],
    };
  } else {
    return {
      success: false,
      message: "User Not Found",
    };
  }
};
