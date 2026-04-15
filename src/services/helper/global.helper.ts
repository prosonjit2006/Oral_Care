import Cookies from "js-cookie";

export const forceLogout = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("role");
  // localStorage.removeItem("userDetails");
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("userDetails");
  window.location.href = "/";
};
