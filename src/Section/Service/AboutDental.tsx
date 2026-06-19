import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import img1 from "../../assets/images/servicesPage/aboutDental/img1.png";
import img2 from "../../assets/images/servicesPage/aboutDental/img2.png";
import img3 from "../../assets/images/servicesPage/aboutDental/img3.png";
import img4 from "../../assets/images/servicesPage/aboutDental/img4.png";

// Give each image a unique ID so Framer Motion can track it across the screen
const imagesData = [
  { id: "img-4", src: img4 },
  { id: "img-1", src: img1 },
  { id: "img-2", src: img2 },
  { id: "img-3", src: img3 },
];

const AboutDental = () => {
  // We just hold the array of images. The first item [0] is ALWAYS the big image.
  // The rest [1, 2, 3] are the small thumbnails.
  const [images, setImages] = useState(imagesData);

  // Auto-cycle the images
  useEffect(() => {
    const timer = setInterval(() => {
      setImages((prevImages) => {
        const newArray = [...prevImages];
        // Take the first image (the big one) and move it to the end of the array
        const first = newArray.shift();
        if (first) newArray.push(first);
        return newArray;
      });
    }, 3500); // Cycles every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-10 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-r from-[#b7cbe0] to-[#d4c7df] overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Heading */}
        <h2 className="text-gray-700 mb-4 sm:mb-6 items-center text-base sm:text-lg md:text-xl">
          About Dental /
          <span className="text-lg sm:text-2xl md:text-3xl font-semibold text-blue-800 ml-1">
            Excellence In Dentistry With Compassionate Care
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-end">
          {/* ── LEFT SIDE ── */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-700 max-w-full sm:max-w-md mb-4 sm:mb-6 text-sm sm:text-base">
                Discover delighted patient reviews about their comforting and
                satisfying dental care experience.
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 sm:gap-3 border border-white/60 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-gray-800 font-medium hover:bg-white/40 transition text-sm sm:text-base">
                  Read more
                </button>
                <span className="p-3 sm:p-3.5 group flex items-center justify-center border border-white/60 rounded-full cursor-pointer hover:bg-white/40 transition">
                  <ArrowUpRight size={20} className="text-gray-800" />
                </span>
              </div>
            </div>

            {/* ── SMALL IMAGES (Thumbnails) ── */}
            {/* Slices the array to only map over items 1, 2, and 3 */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-12 sm:mt-16 lg:mt-32">
              {images.slice(1).map((img) => (
                <motion.div
                  // layoutId tracks this exact div across renders
                  layoutId={img.id}
                  key={img.id}
                  className="relative w-[100px] h-[75px] sm:w-[130px] sm:h-[95px] md:w-[160px] md:h-[120px] lg:w-[180px] lg:h-[135px] rounded-2xl overflow-hidden shadow-sm"
                  // This configures the speed and bounce of the movement
                  transition={{
                    layout: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
                  }}
                >
                  <img
                    src={img.src}
                    alt="dental thumbnail"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE — Big Image ── */}
          <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[450px] xl:h-[500px]">
            {/* We only render the first image [0] here */}
            <motion.div
              layoutId={images[0].id}
              key={images[0].id}
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-lg z-10"
              transition={{
                layout: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
              }}
            >
              <img
                src={images[0].src}
                alt="Dental treatment main"
                className="w-full h-full object-cover"
              />

              {/* Subtle progress bar that resets when the big image changes */}
              <motion.div
                key={`progress-${images[0].id}`}
                className="absolute bottom-0 left-0 h-1.5 bg-white/60 rounded-r-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDental;
