import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useredux";

const AuthRedirectGuards = () => {
  const { isAuthenticate, role } = useAppSelector((state) => state.auth);

  if (isAuthenticate) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (role === "user") {
      return <Navigate to="/profile" replace />;
    }
  }

  return <Outlet />;
};

export default AuthRedirectGuards;
