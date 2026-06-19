import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import img1 from "../../assets/images/landingPage/aboutUs/img1.png";
import img2 from "../../assets/images/landingPage/aboutUs/img2.png";
import img3 from "../../assets/images/landingPage/aboutUs/img3.png";
import img4 from "../../assets/images/landingPage/aboutUs/img4.png";

const cornerImages = [
  {
    src: img1,
    alt: "Dental patient smiling",
    final: { x: 0, y: 20, rotate: -20 },
    initial: { x: 300, y: 80, rotate: 0 }, // Changed to raw numbers
    className: "top-4 left-0 lg:-top-4 lg:left-4",
    floatX: 6,
    floatY: 8,
    floatRotate: 2,
  },
  {
    src: img2,
    alt: "Happy dental patient",
    final: { x: 0, y: -20, rotate: 20 },
    initial: { x: -300, y: 80, rotate: 0 }, // Changed to raw numbers
    className: "top-4 right-0 lg:top-8 lg:right-4",
    floatX: -6,
    floatY: -8,
    floatRotate: -2,
  },
  {
    src: img3,
    alt: "Smiling patient",
    final: { x: 0, y: 20, rotate: 20 },
    initial: { x: 300, y: -80, rotate: 0 }, // Changed to raw numbers
    className: "bottom-4 left-0 lg:bottom-8 lg:left-4",
    floatX: 6,
    floatY: 8,
    floatRotate: -2,
  },
  {
    src: img4,
    alt: "Satisfied dental patient",
    final: { x: 0, y: 20, rotate: -20 },
    initial: { x: -300, y: -80, rotate: 0 }, // Changed to raw numbers
    className: "bottom-4 right-0 lg:bottom-8 lg:right-4",
    floatX: -6,
    floatY: 8,
    floatRotate: 2,
  },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    // ── 1. SECTION fades and slides up safely ──
    <motion.section
      className="py-14 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      initial={{ y: 50, opacity: 0 }} // Changed from x: -100% so it stays in the viewport bounding box
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container px-4 sm:px-6 mx-auto">
        {" "}
        {/* Added mx-auto to center container */}
        <motion.p
          className="text-gray-500 text-sm sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          About Us /
          <span className="text-blue-700 text-lg sm:text-2xl md:text-4xl font-semibold ml-2">
            Excellence In Dentistry With Compassionate Care
          </span>
        </motion.p>
        <div className="relative mt-12 sm:mt-16 md:mt-20 min-h-[420px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px] flex items-center justify-center">
          {cornerImages.map((img, i) => (
            <motion.div
              key={i}
              className={`absolute w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-md ${img.className}`}
              animate={{
                x: [img.initial.x, img.final.x, img.final.x + img.floatX],
                y: [img.initial.y, img.final.y, img.final.y + img.floatY],
                rotate: [
                  img.initial.rotate,
                  img.final.rotate,
                  img.final.rotate + img.floatRotate,
                ],
                opacity: [0, 1, 1],
                scale: [0.7, 1, 1],
              }}
              transition={{
                duration: 4,
                delay: i * 0.12,
                times: [0, 0.28, 1],
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}

          <motion.div
            className="relative z-10 flex flex-col items-center text-center px-4 lg:backdrop-blur-sm p-6 rounded-2xl"
            /* Added background blur so text is readable over floating images */
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 max-w-xs sm:max-w-md md:max-w-2xl leading-tight font-bold">
              Excellence In Dentistry <br />
              With Compassionate Care
            </h2>

            <p className="mt-4 sm:mt-6 max-w-[260px] sm:max-w-sm md:max-w-md text-sm sm:text-base text-gray-600">
              "Professional dental care with regular check-ups and advanced
              treatments."
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 md:mt-8">
              <button
                onClick={() => navigate("/booking")}
                className="bg-blue-700 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </button>

              <button className="border border-gray-400 px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 text-sm sm:text-base">
                About Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
