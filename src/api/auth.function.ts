import { Query } from "appwrite";
import { account, bucket, ID, tablesDB } from "../lib/Appwrite.config";
import type {
  LoginPayload,
  SignupPayload,
} from "../type/interface/auth.interface";
import Cookies from "js-cookie";

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

// export const loginUserfns = async (data: LoginPayload) => {
//   console.log("data coming in loginfns", data);
//   const findUser = await tablesDB.listRows({
//     databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     tableId: "user",
//     queries: [Query.equal("email", [data.email])],
//   });

//   console.log("find user", findUser);

//   if (findUser.rows.length > 0) {
//     await account.createEmailPasswordSession({
//       email: data.email,
//       password: data.password,
//     });

//     console.log("row list", findUser.rows);
//     console.log("email", findUser.rows[0].email);

//     // ! based on the user email fetch the patient data and store it on the cookies
//      const patient = await tablesDB.listRows({
//        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
//        tableId: "patient",
//        queries: [Query.equal("email", [data.email])],
//      });

//      console.log('patient', patient)

//      if(patient){
//       Cookies.set('patient', JSON.stringify(patient.rows[0]))
//      }

//     return {
//       success: true,
//       message: "Login Successfully",
//       user: findUser?.rows?.[0],
//     };
//   } else {
//     return {
//       success: false,
//       message: "User Not Found",
//     };
//   }
// };

export const loginUserfns = async (data: LoginPayload) => {
  console.log("Login payload received:", data);

  try {
    // 1. Create the Auth Session First
    // This will throw an error automatically if the email/password combination is wrong.
    await account.createEmailPasswordSession(data.email, data.password);

    // 2. Fetch the Custom User Profile
    const findUser = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: "user",
      queries: [Query.equal("email", data.email)],
    });

    if (findUser.rows.length === 0) {
      return {
        success: false,
        message:
          "Authentication successful, but user profile not found in database.",
      };
    }

    const userData = findUser.rows[0];
    console.log("User data retrieved:", userData);

    // 3. Fetch the Patient Data
    const patientRes = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: "patient",
      queries: [Query.equal("email", data.email)],
    });

    console.log("Patient query result:", patientRes);

    // 4. Safely check if a patient record exists before setting the cookie
    if (patientRes.rows.length > 0) {
      const patientData = patientRes.rows[0];

      // Store in cookies for 7 days
      Cookies.set("patient", JSON.stringify(patientData), { expires: 7 });
    }

    return {
      success: true,
      message: "Login Successfully",
      user: userData,
    };
  } catch (error) {
    // This catches wrong passwords, invalid emails, or network errors
    const err = error as { message: string };
    console.error("Login Error:", error);
    return {
      success: false,
      message: err.message || "An error occurred during login.",
    };
  }
};
