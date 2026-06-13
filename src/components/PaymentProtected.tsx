import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../hooks/useredux";
import { openLogin } from "../store/slices/auth.slice";
import { toast } from "sonner";

const PaymentProtected = () => {
  const dispatch = useAppDispatch();

  const user = Cookies.get("user");
  const role = Cookies.get("role");

  const isAuthenticated = !!user;

  if (!isAuthenticated) {
      <Navigate to="/" replace />;
      dispatch(openLogin());
      toast.error("login before payment");
    }
    
    if (!["admin", "user"].includes(role ?? "")) {
        return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PaymentProtected;
