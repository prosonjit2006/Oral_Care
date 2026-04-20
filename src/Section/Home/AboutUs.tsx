import imgFront from "../../assets/images/landingPage/aboutUs/img2.png";
import imgBack from "../../assets/images/landingPage/aboutUs/img1.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F0F8FF] py-14 pb-32 md:pb-0 sm:py-16 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6">
        {/* top small heading */}
        <p className="text-gray-500 text-sm sm:text-lg md:text-xl">
          About Us /
          <span className="text-blue-700 text-lg sm:text-2xl md:text-4xl font-semibold ml-2 md:inline">
            Excellence In Dentistry With Compassionate Care
          </span>
        </p>

        {/* Center Section */}
        <div className="relative flex flex-col items-center text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          {/* Cross Images */}
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-10 md:mb-16">
            {/* Back Image */}
            <div className="absolute inset-0 rotate-9 rounded-2xl">
              <img
                src={imgBack}
                alt="Dental Care"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Front Image */}
            <div className="absolute inset-0 -rotate-6 rounded-2xl">
              <img
                src={imgFront}
                alt="Dentist"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="absolute top-20 sm:top-24 md:top-28 lg:top-32">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl leading-tight">
              Excellence In Dentistry <br />
              With Compassionate Care
            </h2>

            {/* Description */}
            <p className="mt-4 sm:mt-6 max-w-[260px] sm:max-w-[300px] md:max-w-md mx-auto text-sm sm:text-base">
              Professional dental care with regular check-ups and advanced
              treatments.
            </p>

            {/* Buttons */}
            <div className="flex flex-col  sm:flex-row justify-center items-center gap-4 mt-6 md:mt-8">
              <button
                onClick={() => navigate("/booking")}
                className="bg-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-blue-800 transition duration-500 text-sm sm:text-base"
              >
                Book Appointment
              </button>

              <button className="border border-gray-400 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-gray-300 transition duration-500 text-sm sm:text-base">
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
