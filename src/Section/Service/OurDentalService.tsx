import { ArrowUpRight, Play } from "lucide-react";
import img from "../../assets/images/servicesPage/ourDentalService/img.png";
import { services } from "../../services/json/data.json";

const OurDentalService = () => {
  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-r from-[#b7cbe0] to-[#d4c7df]">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* LEFT SIDE */}
          <div>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-2 flex flex-wrap items-center">
              Our Services /
              <span className="text-lg sm:text-2xl md:text-3xl font-semibold text-blue-800 ml-1">
                Discover Our Dental Services
              </span>
            </p>

            <p className="text-gray-700 max-w-full sm:max-w-md mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base">
              Straighten your teeth comfortably with clear aligners or
              traditional braces tailored to your needs.
            </p>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-3 sm:gap-4 border border-blue-400 rounded-full px-4 sm:px-6 py-3 sm:py-4 w-full sm:w-[280px] md:w-[320px] hover:bg-blue-200 transition"
                >
                  <span className="text-gray-800 font-medium text-sm sm:text-base">
                    {service.id}/
                  </span>

                  <span className="text-gray-800 text-sm sm:text-base">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            <p className="text-gray-700 text-sm sm:text-md max-w-full sm:max-w-sm ml-0 sm:ml-auto mb-4 sm:mb-6 text-left sm:text-right">
              Discover delighted patient reviews about their comforting &
              satisfying dental care experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-end">
              <div className="relative rounded-3xl overflow-hidden w-full">
                <img
                  src={img}
                  alt="Dental Service"
                  className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] object-cover"
                />

                {/* play btn */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-blue-200 flex items-center justify-center text-white shadow-lg hover:scale-105 transition">
                    <Play color="#0C4FA7" size={18} />
                  </button>
                </div>
              </div>

              {/* BOOK BUTTON */}
              <div className="flex justify-start sm:justify-end">
                <button className="flex items-center text-xs sm:text-sm gap-2 sm:gap-3 bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-blue-800 transition">
                  Book Appointment
                  <span className="bg-blue-400 p-1.5 sm:p-2 rounded-full">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurDentalService;
