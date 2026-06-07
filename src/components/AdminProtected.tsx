import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useredux";

const AdminProtected = () => {
  const { isAuthenticate, role } = useAppSelector((state) => state.auth);

  const isAuth = isAuthenticate && role === "admin";

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminProtected;
