import Lottie from "lottie-react";
import notFound from "../services/json/notFound.json";
import Navbar from "../layout/user/Navbar";

const NotFound = () => {
  return (
    <div className="h-screen w-full bg-black/50">
      <Navbar />
      <Lottie
        animationData={notFound}
        loop
        className=" max-w-3xl mx-auto h-auto pt-10"
      />
    </div>
  );
};

export default NotFound;
