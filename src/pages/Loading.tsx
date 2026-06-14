import Lottie from "lottie-react";
import loading from "../services/json/loading.json";

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white/70 rounded-2xl shadow-xl px-4 py-3">
        <Lottie
          animationData={loading}
          loop
          className="w-32 h-32 md:w-40 md:h-40"
        />
      </div>
    </div>
  );
};

export default Loading;
