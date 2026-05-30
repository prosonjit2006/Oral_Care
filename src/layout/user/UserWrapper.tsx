import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

const UserWrapper = () => {
  return (
    <>
      <Navbar />
      <main>
        <Login />
        <Signup />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserWrapper;
