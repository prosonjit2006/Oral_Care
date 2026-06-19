import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AboutTeams } from "../../type/interface/global.interface";

interface AnimatedDoctorCardProps {
  doctors: AboutTeams[];
  autoPlayInterval?: number;
}

function getInitials(name: string): string {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const cardVariants = {
  enter: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -22 },
};

const AnimatedDoctorCard = ({
  doctors,
  autoPlayInterval = 3000,
}: AnimatedDoctorCardProps) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = doctors.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [paused, total, autoPlayInterval]);

  const goTo = (index: number) => {
    setCurrent((index + total) % total);
  };

  if (!doctors.length) return null;

  const doctor = doctors[current];

  return (
    <div
      className="w-[300px] sm:w-[340px] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Nav row */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Previous doctor"
          className="flex items-center gap-1 text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">&#8249;</span>
          <span>{String(current + 1).padStart(2, "0")}</span>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-[5px]">
          {doctors.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to doctor ${i + 1}`}
              className="h-[3px] rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === current ? 28 : 18,
                background:
                  i === current ? "#ffffff" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          aria-label="Next doctor"
          className="flex items-center gap-1 text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span>{String(total).padStart(2, "0")}</span>
          <span className="text-lg leading-none">&#8250;</span>
        </button>
      </div>

      {/* Card */}
      <div className="relative h-[110px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={doctor.id}
            variants={cardVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-[18px] border border-white/20 flex items-center gap-4 px-3 py-1"
          >
            {/* Avatar */}
            {doctor.img ? (
              <img
                src={doctor.img}
                alt={doctor.name}
                className="w-20 h-20 rounded-[12px] object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-[12px] flex-shrink-0 flex items-center justify-center text-xl font-semibold">
                {getInitials(doctor.name)}
              </div>
            )}

            {/* Info */}
            <div className="flex flex-col min-w-0">
              <p className="text-[16px] font-bold text-white leading-snug truncate">
                {doctor.name}
              </p>
              <p className="text-[12px] text-gray-300 leading-snug mb-2">
                {doctor.position}
              </p>
              <p className="text-[13px] font-semibold text-neutral-300 leading-snug">
                {doctor.experience} years Experience
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedDoctorCard;
