import axios from "axios";
import { toast } from "sonner";
import { forceLogout } from "../services/helper/global.helper";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error in axios interceptor", error.response);
    if (error.response.status === 403 || error.response.status === 401) {
      toast.error(error.response.data.message);
      forceLogout();
    }
    return Promise.reject(error);
  },
);

export default api;
