import bannerImg from "../../public/hero-section.png";

const Banner = () => {
  return (
    <section className="relative w-full h-[100vh]">
      {/* Background Image */}
      <img
        src={bannerImg}
        alt="Dental Care Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <span className="absolute inset-0 bg-black/30"></span>

      {/* Content */}
      <div className="container ">
        <div className="w-[1280px] absolute bottom-16 flex justify-between align-middle items-center">
          {/* part 1 */}
          <div className=" flex flex-col justify-center  text-white max-w-4xl">
            <p className="  text-lg mb-3 max-w-80">
              “Professional dental care with regular check-ups and advanced
              treatments”.
            </p>

            <div className="flex gap-4">
              <button className="bg-blue-600 px-4 py-2 rounded-md text-base hover:bg-blue-700 transition">
                Book Appointment
              </button>

              <button className="border border-white px-4 py-2 rounded-md text-base hover:bg-white hover:text-black transition">
                View Services
              </button>
            </div>
          </div>

          {/* part 2 */}
          <div className="bannerCard">
            {/* card must have to add here using the card rendering method */}
            <h1 className=" text-white text-4xl font-bold">Card Add</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
