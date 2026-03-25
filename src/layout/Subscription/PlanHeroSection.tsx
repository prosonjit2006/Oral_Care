const PlanHeroSection = () => {
  return (
    <section className="relative w-full h-[45vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden">
      
      {/* Background Image */}
      <img
        src="/plan-hero-section.png"
        alt="Dental Care Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-400/70 to-blue-900/90"></div>

      {/* Title */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <h1 className="
        text-4xl
        sm:text-6xl
        md:text-7xl
        lg:text-8xl
        xl:text-[200px]
        font-semibold
        text-white
        text-center
        leading-tight
        ">
          Billing Plans
        </h1>
      </div>

    </section>
  );
};

export default PlanHeroSection;