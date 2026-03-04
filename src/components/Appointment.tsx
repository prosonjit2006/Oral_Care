import img1 from "../assets/images/landingPage/appointment/img1.png";
import img2 from "../assets/images/landingPage/appointment/img2.png";
import { HeartPulse, Smile } from "lucide-react";

const Appointment = () => {
  return (
    <section className="bg-gradient-to-tr from-[#CEEBFE] to-[#EDD6FF]   overflow-hidden h-fit">
      <div className="container grid grid-cols-1 lg:grid-cols-3 items-center gap-10 px-4 h-fit">
        {/* LEFT IMAGE */}
        <figure className="flex justify-center lg:justify-start items-end h-full">
          <img
            src={img1}
            alt="Family Dental Care"
            className="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[340px] w-auto object-contain"
          />
        </figure>
        {/* CENTER TEXT */}
        <div className="flex flex-col items-center text-center gap-5">
          <span className="flex items-center gap-3 text-[#0C4FA7] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Bright Smile <Smile size={30} />
          </span>

          <span className="flex items-center gap-3 text-[#0C4FA7] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <HeartPulse size={30} /> Healthy Lives
          </span>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition">
              Book Appointment
            </button>

            <button className="border border-gray-500 px-6 py-3 rounded-full hover:bg-gray-100 transition">
              Make a Schedule
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <figure className="flex justify-center lg:justify-end items-end h-full">
          <img
            src={img2}
            alt="Doctor"
            className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[360px] w-auto object-contain"
          />
        </figure>
      </div>
    </section>
  );
};

export default Appointment;
