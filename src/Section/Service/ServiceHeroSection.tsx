import { Play } from "lucide-react";

const ServiceHeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/service-hero-section.png"
        alt="Dental Care Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="container relative z-10 flex items-center h-full">
        <h1
          className="
        absolute
        top-20 sm:top-24 md:top-28 lg:top-32
        left-4 sm:left-8 md:left-12 lg:left-16
        text-white
        text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[128px]
        text-center
        font-bold
        leading-tight
        "
        >
          Welcome to Oral Care
        </h1>

        <div
          className="
        w-full
        absolute
        bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16
        flex
        flex-col lg:flex-row
        gap-8 lg:gap-0
        items-start lg:items-center
        "
        >
          <div className="flex flex-col text-white max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
            <p
              className="
            text-sm sm:text-base md:text-lg
            mb-4
            max-w-xs sm:max-w-[360px] md:max-w-[400px]
            "
            >
              “Professional dental care with regular check-ups and advanced
              treatments”.
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                className="
              bg-blue-600
              px-4 sm:px-5
              py-2
              rounded-3xl
              text-sm sm:text-base
              hover:bg-blue-700
              transition
              "
              >
                Our Services
              </button>

              <button
                className="
              bg-cyan-200
              px-3
              py-2
              rounded-full
              text-sm sm:text-base
              hover:bg-white
              hover:text-black
              transition
              flex
              items-center
              justify-center
              "
              >
                <Play color="#0C4FA7" size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
