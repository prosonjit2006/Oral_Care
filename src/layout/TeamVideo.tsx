import { Play } from "lucide-react";
import img from "../assets/images/teamPage/teamVideo/img.png";

const TeamVideo = () => {
  return (
    <section className="w-full h-full bg-gradient-to-r from-[#CEEBFE] to-[#EDD6FF]">
      <div className="container">
        <p className="text-center text-2xl max-w-[850px] mx-auto py-6">
          More than just healthy teeth, We believe in creating happy experience,
          our team listens, Understanding, And guides you through every step,{" "}
          <span className="text-gray-500">
            Making sure your journey to a brighter smile feels effortless and
            reassuring.
          </span>
        </p>
      </div>
      <div className=" relative">
        <img src={img} alt="video img" />
        <div className="bg-blue-300 rounded-full p-3 absolute top-[50%] left-[50%]">
          {" "}
          <Play size={20} />{" "}
        </div>
      </div>
    </section>
  );
};

export default TeamVideo;
