import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/useredux";

const AdminProtected = () => {
  const { isAuthenticate, role } = useAppSelector((state) => state.auth);

  const location = useLocation();

  const isAuth = isAuthenticate && role === "admin";

  // console.log('nav location ', location.pathname)

  if (
    (isAuth && location.pathname === "/login") ||
    (isAuth && location.pathname === "/signup")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default AdminProtected;
