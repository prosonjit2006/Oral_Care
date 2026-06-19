import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { teamImages } from "../../services/json/data.json";

const TeamMembers = () => {
  const sectionRef = useRef(null);

  // 1. We create state to hold our dynamic spread distances
  const [spreadDistances, setSpreadDistances] = useState({
    far: 520,
    mid: 270,
    yOff: 40,
  });

  // 2. We listen to the window size to adjust the spread so it never breaks the screen edge
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile layout: Tighter spread
        setSpreadDistances({ far: 105, mid: 55, yOff: 15 });
      } else if (width < 1024) {
        // Tablet layout: Medium spread
        setSpreadDistances({ far: 230, mid: 120, yOff: 25 });
      } else {
        // Desktop layout: Full wide spread
        setSpreadDistances({ far: 520, mid: 270, yOff: 40 });
      }
    };

    handleResize(); // Check once on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end center"],
  });

  const spread = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  // 3. The configs now use the responsive state variables!
  const spreadConfigs = [
    {
      x: useTransform(spread, [0, 1], [0, -spreadDistances.far]),
      y: useTransform(spread, [0, 1], [0, spreadDistances.yOff]),
      rotate: useTransform(spread, [0, 1], [0, -8]),
      scale: useTransform(spread, [0, 1], [1, 0.88]),
      zIndex: 10,
    },
    {
      x: useTransform(spread, [0, 1], [0, -spreadDistances.mid]),
      y: useTransform(spread, [0, 1], [0, spreadDistances.yOff / 2]),
      rotate: useTransform(spread, [0, 1], [0, -4]),
      scale: useTransform(spread, [0, 1], [1, 0.93]),
      zIndex: 20,
    },
    {
      x: useTransform(spread, [0, 1], [0, 0]),
      y: useTransform(spread, [0, 1], [0, 0]),
      rotate: useTransform(spread, [0, 1], [0, 0]),
      scale: useTransform(spread, [0, 1], [1, 1.08]),
      zIndex: 40,
    },
    {
      x: useTransform(spread, [0, 1], [0, spreadDistances.mid]),
      y: useTransform(spread, [0, 1], [0, spreadDistances.yOff / 2]),
      rotate: useTransform(spread, [0, 1], [0, 4]),
      scale: useTransform(spread, [0, 1], [1, 0.93]),
      zIndex: 20,
    },
    {
      x: useTransform(spread, [0, 1], [0, spreadDistances.far]),
      y: useTransform(spread, [0, 1], [0, spreadDistances.yOff]),
      rotate: useTransform(spread, [0, 1], [0, 8]),
      scale: useTransform(spread, [0, 1], [1, 0.88]),
      zIndex: 10,
    },
  ];

  return (
    <section ref={sectionRef} className="py-6 sm:py-8 lg:py-12 overflow-hidden">
      {/* ── TOP INFO GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 container mx-auto px-4">
        {/* Left card */}
        <div className="p-5 sm:p-6 lg:p-8 bg-[#CEEBFE] rounded-2xl flex flex-col justify-center">
          <p className="mb-3 sm:mb-5 text-base sm:text-xl lg:text-2xl text-gray-700">
            Our Team /
            <span className="block sm:inline text-xl sm:text-2xl lg:text-3xl font-semibold text-[#0C4FA7] sm:ml-1 mt-1 sm:mt-0">
              Lorem ipsum dolor sit amet, consectetur
            </span>
          </p>
          <p className="max-w-full text-sm sm:text-base text-gray-700 leading-relaxed">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <div className="mt-5 sm:mt-6">
            <button className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 transition text-white text-sm sm:text-base font-medium shadow-md">
              See More
            </button>
          </div>
        </div>

        {/* Right stats + cards */}
        <div className="flex flex-col justify-between pt-2 md:pt-4">
          {/* Tweaked text scaling here so it doesn't squish on tablets */}
          <div className="grid grid-cols-3 text-[#0C4FA7] gap-2 sm:gap-4 border-b border-gray-200 pb-6 mb-6 md:border-none md:pb-0 md:mb-0">
            <p className="flex flex-col text-center text-xl sm:text-2xl lg:text-3xl font-bold">
              15+
              <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-600 mt-1">
                Years Experience
              </span>
            </p>
            <p className="flex flex-col text-center text-xl sm:text-2xl lg:text-3xl font-bold border-l border-r border-gray-200">
              4,500+
              <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-600 mt-1">
                Happy Customer
              </span>
            </p>
            <p className="flex flex-col text-center text-xl sm:text-2xl lg:text-3xl font-bold">
              150+
              <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-600 mt-1">
                Lorem Ipsam
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <div className="p-4 lg:p-5 bg-[#EDD6FF] rounded-xl shadow-sm">
              <p className="font-bold text-lg sm:text-xl mb-2 text-gray-800">
                Lorem Ipsam
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris.
              </p>
            </div>
            <div className="p-4 lg:p-5 bg-[#EDD6FF] rounded-xl shadow-sm">
              <p className="font-bold text-lg sm:text-xl mb-2 text-gray-800">
                Lorem Ipsam
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── IMAGE SPREAD SECTION ── */}
      <div className="flex justify-center items-center h-[260px] sm:h-[380px] md:h-[420px] lg:h-[480px] mt-10 lg:mt-16 overflow-visible relative">
        <div className="relative w-[150px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-[200px] sm:h-[300px] md:h-[340px] lg:h-[380px]">
          {teamImages.map((img, index) => {
            const cfg = spreadConfigs[index];
            return (
              <motion.div
                key={index}
                className="absolute inset-0 origin-bottom"
                style={{
                  x: cfg.x,
                  y: cfg.y,
                  rotate: cfg.rotate,
                  scale: cfg.scale,
                  zIndex: cfg.zIndex,
                }}
              >
                <motion.img
                  src={img}
                  alt={`team member ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl shadow-xl cursor-pointer"
                  whileHover={{
                    scale: 1.15,
                    y: -20, // Slightly reduced pop distance for safety on smaller screens
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
