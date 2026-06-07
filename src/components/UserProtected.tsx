import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useredux";

const UserProtected = () => {
  const { isAuthenticate, role } = useAppSelector((state) => state.auth);

  const isAuth = isAuthenticate && role === "user";

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default UserProtected;
