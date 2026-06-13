import { Client, Account, TablesDB, Storage, Functions } from "appwrite";

export const client = new Client();

client
// .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const bucket = new Storage(client);
export const functions = new Functions(client);
export { ID } from "appwrite";
