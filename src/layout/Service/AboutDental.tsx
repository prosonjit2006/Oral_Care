import { ArrowUpRight } from "lucide-react";
import img1 from "../../assets/images/servicesPage/aboutDental/img1.png";
import img2 from "../../assets/images/servicesPage/aboutDental/img2.png";
import img3 from "../../assets/images/servicesPage/aboutDental/img3.png";
import img4 from "../../assets/images/servicesPage/aboutDental/img4.png";

const images = [img1, img2, img3];

const AboutDental = () => {
  return (
    <section className="w-full py-10 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-r from-[#b7cbe0] to-[#d4c7df]">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-gray-700 mb-4 sm:mb-6 items-center text-base sm:text-lg md:text-xl">
          About Dental /
          <span className="text-lg sm:text-2xl md:text-3xl font-semibold text-blue-800 ml-1">
            Excellence In Dentistry With Compassionate Care
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* LEFT SIDE */}
          <div>
            <p className="text-gray-700 max-w-full sm:max-w-md mb-4 sm:mb-6 text-sm sm:text-base">
              Discover delighted patient reviews about their comforting and
              satisfying dental care experience.
            </p>

            {/* READ MORE BUTTON */}
            <div className="flex items-center gap-1 sm:gap-1">
              <button className="flex items-center gap-2 sm:gap-3 border border-white/40 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-gray-800 hover:bg-white/30 transition text-sm sm:text-base">
                Read more
              </button>

              <span className="px-3 py-3 sm:px-4 sm:py-4 group flex items-center justify-center border border-white/40 rounded-full">
                <ArrowUpRight
                  size={16}
                  className="text-white group-hover:text-black"
                />
              </span>
            </div>

            {/* SMALL IMAGES */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16 lg:mt-48">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="w-[110px] h-[80px] sm:w-[140px] sm:h-[100px] md:w-[180px] md:h-[130px] lg:w-[195px] lg:h-[150px] rounded-2xl overflow-hidden"
                >
                  <img
                    src={img}
                    alt="dental"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img
                src={img4}
                alt="Dental treatment"
                className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDental;
