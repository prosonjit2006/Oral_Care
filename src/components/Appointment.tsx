import img1 from "../assets/images/appointment/img1.png";
import img2 from "../assets/images/appointment/img2.png";
import { HeartPulse, Smile } from "lucide-react";

const Appointment = () => {
  return (
    <section className="bg-gradient-to-tr from-[#CEEBFE] to-[#EDD6FF] h-auto">
      <div className=" relative grid grid-cols-1 lg:grid-cols-3 items-center gap-10 ">
        {/* img 1 */}
        <figure className=" h-full">
          <img src={img1} alt="img 1" className="w-full h-full object-cover" />
        </figure>
        {/* text data */}
        <div className=" flex flex-col items-center">
          <span className=" flex items-center font-xl md:text-3xl lg:text-5xl font-semibold text-[#0C4FA7] gap-2 mb-1 mr-24">
            Bright Smile <Smile size={35} />
          </span>
          <span className=" flex items-center font-xl md:text-3xl lg:text-5xl font-semibold text-[#0C4FA7] gap-2 mt-2 ml-24">
            <HeartPulse size={35} /> Healthy Lives
          </span>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition">
              Book Appointment
            </button>

            <button className="border border-gray-400 px-6 py-3 rounded-full hover:bg-gray-100 hover:border-zinc-600 transition">
              Make a Schedule
            </button>
          </div>
        </div>
        {/* img 2 */}
        <figure className=" absolute right-0 -top-12 w-[388px]">
          <img src={img2} alt="img 2" className="w-full h-full object-cover" />
        </figure>
      </div>
    </section>
  );
};

export default Appointment;
