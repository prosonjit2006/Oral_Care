import { useNavigate } from "react-router-dom";
import AnimatedDoctorCard from "./AnimatedDoctorCard";
import { aboutTeams } from "../../services/json/data.json";

const Banner = () => {
  const navigate = useNavigate();

  return (
    // Moved the Flexbox positioning directly to the section wrapper to guarantee it sticks to the bottom
    <section className="relative w-full min-h-[100dvh] lg:h-screen overflow-hidden flex flex-col justify-end pb-10 lg:pb-16 pt-24">
      {/* Background Image */}
      <img
        src="/hero-section.png"
        alt="Dental Care Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <span className="absolute inset-0 bg-black/40"></span>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-center lg:items-end">
        {/* Part 1: Text & Buttons */}
        {/* Centered on mobile (items-center, text-center), left-aligned on desktop (lg:items-start, lg:text-left) */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left text-white w-full lg:max-w-xl">
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-sm sm:max-w-md leading-relaxed">
            “Professional dental care with regular check-ups and advanced
            treatments”.
          </p>

          {/* Buttons centered on mobile, left on desktop */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate("/booking")}
              className="bg-blue-600 px-5 py-2.5 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-blue-700 transition shadow-lg"
            >
              Book Appointment
            </button>

            <button className="border border-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base font-medium hover:bg-white hover:text-black transition">
              View Services
            </button>
          </div>
        </div>

        {/* Part 2: Doctor Card */}
        {/* Centered on mobile, pushed to the right on desktop */}
        <div className="bannerCard w-full sm:max-w-md lg:w-auto flex justify-center lg:justify-end">
          <AnimatedDoctorCard doctors={aboutTeams} autoPlayInterval={4000} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
