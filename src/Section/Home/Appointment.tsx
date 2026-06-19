import { useNavigate } from "react-router-dom";
import img1 from "../../assets/images/landingPage/appointment/img1.png";
import img2 from "../../assets/images/landingPage/appointment/img2.png";
import { HeartPulse, Smile } from "lucide-react";

const Appointment = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-tr from-[#CEEBFE] to-[#EDD6FF] overflow-visible relative">
      {/* Mobile & Tablet layout (below lg) */}
      {/* Changed py-10 to pt-10 so the bottom image can sit flush on the bottom edge */}
      <div className="lg:hidden flex flex-col items-center text-center pt-10 px-4">
        <figure className="mb-6">
          <img
            src={img1}
            alt="Family Dental Care"
            className="h-[200px] sm:h-[240px] w-auto object-contain mx-auto object-bottom"
          />
        </figure>

        <span className="flex items-center gap-3 text-[#0C4FA7] font-semibold text-xl sm:text-2xl">
          Bright Smile <Smile size={26} />
        </span>
        <span className="flex items-center gap-3 text-[#0C4FA7] font-semibold text-xl sm:text-2xl mt-2">
          <HeartPulse size={26} /> Healthy Lives
        </span>

        <div className="flex flex-col sm:flex-row gap-4 my-8">
          <button
            onClick={() => navigate("/booking")}
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition"
          >
            Book Appointment
          </button>
          <button className="border border-gray-500 px-6 py-3 rounded-full hover:bg-gray-100 transition">
            Make a Schedule
          </button>
        </div>

        {/* BOTTOM IMAGE (Was Right Image) */}
        {/* Added w-full and mt-auto to ensure it grounds itself at the bottom of the section */}
        <figure className="w-full flex justify-center mt-auto">
          <img
            src={img2}
            alt="Doctor"
            className="h-[220px] sm:h-[260px] w-auto object-contain object-bottom"
          />
        </figure>
      </div>

      {/* Desktop layout (lg and above) */}
      <div className="hidden lg:grid grid-cols-3 items-end container mx-auto px-4 relative min-h-[320px] xl:min-h-[360px] 2xl:min-h-[400px]">
        {/* LEFT — family image pinned to bottom */}
        <figure className="flex justify-start items-end h-full">
          <img
            src={img1}
            alt="Family Dental Care"
            className="
              w-auto object-contain object-bottom
              h-[280px] xl:h-[320px] 2xl:h-[360px]
            "
          />
        </figure>

        {/* CENTER — text vertically centered */}
        <div className="flex flex-col items-center text-center gap-5 py-10 xl:py-12">
          <span className="flex items-center gap-3 text-[#0C4FA7] font-semibold text-3xl xl:text-4xl 2xl:text-5xl">
            Bright Smile <Smile size={34} />
          </span>
          <span className="flex items-center gap-3 text-[#0C4FA7] font-semibold text-3xl xl:text-4xl 2xl:text-5xl">
            <HeartPulse size={34} /> Healthy Lives
          </span>
          <div className="flex flex-row gap-4 mt-2">
            <button
              onClick={() => navigate("/booking")}
              className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition text-base"
            >
              Book Appointment
            </button>
            <button className="border border-gray-500 px-6 py-3 rounded-full hover:bg-gray-100 transition text-base">
              Make a Schedule
            </button>
          </div>
        </div>

        {/* RIGHT — doctor overflows upward out of section */}
        <figure className="flex justify-end items-end h-full">
          <img
            src={img2}
            alt="Doctor"
            className="
              w-auto object-contain
              h-[300px] xl:h-[350px] 2xl:h-[400px] 
              lg:translate-y-0 xl:-translate-y-0 2xl:translate-y-0
            "
          />
        </figure>
      </div>
    </section>
  );
};

export default Appointment;
