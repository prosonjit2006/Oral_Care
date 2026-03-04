const ServiceHeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/hero-section.png"
        alt="Dental Care Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <span className="absolute inset-0 bg-black/30"></span>

      {/* Content */}
      <div className="container relative z-10 flex items-center h-full">
        <div className="w-full absolute bottom-12 lg:bottom-16 flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-start lg:items-center">
          {/* Part 1 */}
          <div className="flex flex-col text-white max-w-sm sm:max-w-md lg:max-w-xl">
            <p className="text-base sm:text-lg mb-4 max-w-xs sm:max-w-sm">
              “Professional dental care with regular check-ups and advanced
              treatments”.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition">
                Book Appointment
              </button>

              <button className="border border-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-white hover:text-black transition">
                View Services
              </button>
            </div>
          </div>

          {/* Part 2 */}
          <div className="bannerCard w-full lg:w-auto">
            {/* Card placeholder */}
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
              Card Add
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
