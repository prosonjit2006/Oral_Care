import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { photoWall } from "../../services/json/data.json";

// 1. Define the fly-in trajectories for the 10 images.
// dx/dy = how far off-screen they start. dr = initial rotation.
const scatterConfigs = [
  { dx: -400, dy: -300, dr: -25 }, // 0
  { dx: -150, dy: -400, dr: 15 }, // 1
  { dx: 0, dy: -250, dr: -10 }, // 2
  { dx: 250, dy: -350, dr: 20 }, // 3
  { dx: 450, dy: -200, dr: -15 }, // 4
  { dx: -450, dy: 250, dr: 25 }, // 5
  { dx: -200, dy: 350, dr: -20 }, // 6
  { dx: 0, dy: 450, dr: 15 }, // 7
  { dx: 250, dy: 300, dr: -25 }, // 8
  { dx: 450, dy: 400, dr: 10 }, // 9
];

// 2. Helper component: Automatically maps the scroll progress to the scatter animation
const ScatterImage = ({
  src,
  index,
  progress,
  className,
}: {
  src: any;
  index: any;
  progress: any;
  className: any;
}) => {
  const config = scatterConfigs[index % scatterConfigs.length];

  // Map progress (0 to 1) to final assembled position (0px offset, 0 rotation)
  const x = useTransform(progress, [0, 1], [config.dx, 0]);
  const y = useTransform(progress, [0, 1], [config.dy, 0]);
  const rotate = useTransform(progress, [0, 1], [config.dr, 0]);

  // Fade in as they assemble
  const opacity = useTransform(progress, [0, 0.7, 1], [0, 1, 1]);

  return (
    <motion.img
      src={src}
      alt={`customer-${index}`}
      className={className}
      style={{ x, y, rotate, opacity }}
      whileHover={{ scale: 1.05, zIndex: 20 }} // Slight pop on hover
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      loading="lazy"
    />
  );
};

const TeamPictureWall = () => {
  const sectionRef = useRef(null);

  // 3. Track scroll progress.
  // Starts when section top is at 90% of screen. Ends when section center hits screen center.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center 55%"],
  });

  // Clamp the progress to a clean 0-1 value
  const assembleProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    // Added overflow-hidden so the scattered images don't cause horizontal scrolling
    <section ref={sectionRef} className="w-full py-10 overflow-hidden">
      <div className="container px-4 mx-auto">
        <p className="flex items-center text-sm md:text-xl relative z-30">
          Picture Wall /
          <span className="text-[#0C4FA7] text-xl md:text-3xl font-bold ml-1">
            Our Customers
          </span>
        </p>

        {/* ── MOBILE + TABLET (GRID) ── */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden relative z-10">
          {photoWall.map((img, i) => (
            <div key={i} className="w-full h-[140px] sm:h-[180px]">
              <ScatterImage
                src={img}
                index={i}
                progress={assembleProgress}
                className="w-full h-full object-cover rounded-xl shadow-md cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* ── DESKTOP MOSAIC (EXACT SAME LAYOUT) ── */}
        <div className="hidden lg:flex flex-col items-center justify-center pt-14 gap-3 relative z-10">
          {/* Top part */}
          <div className="flex gap-3 items-end">
            <div className="w-[330px] h-[220px]">
              <ScatterImage
                src={photoWall[0]}
                index={0}
                progress={assembleProgress}
                className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col w-[180px] gap-3">
              <div className="h-[140px]">
                <ScatterImage
                  src={photoWall[1]}
                  index={1}
                  progress={assembleProgress}
                  className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
                />
              </div>
              <div className="h-[180px]">
                <ScatterImage
                  src={photoWall[2]}
                  index={2}
                  progress={assembleProgress}
                  className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="w-[330px] h-[280px]">
              <ScatterImage
                src={photoWall[3]}
                index={3}
                progress={assembleProgress}
                className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
              />
            </div>

            <div className="w-[180px] h-[160px]">
              <ScatterImage
                src={photoWall[4]}
                index={4}
                progress={assembleProgress}
                className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Bottom part */}
          <div className="flex gap-3 items-start">
            <div className="w-[180px] h-[200px]">
              <ScatterImage
                src={photoWall[5]}
                index={5}
                progress={assembleProgress}
                className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
              />
            </div>

            <div className="w-[330px] h-[240px]">
              <ScatterImage
                src={photoWall[6]}
                index={6}
                progress={assembleProgress}
                className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col w-[180px] gap-3">
              <div className="h-[160px]">
                <ScatterImage
                  src={photoWall[7]}
                  index={7}
                  progress={assembleProgress}
                  className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
                />
              </div>
              <div className="h-[140px]">
                <ScatterImage
                  src={photoWall[8]}
                  index={8}
                  progress={assembleProgress}
                  className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="w-[330px] h-[180px]">
              <ScatterImage
                src={photoWall[9]}
                index={9}
                progress={assembleProgress}
                className="rounded-xl w-full h-full object-cover shadow-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPictureWall;
