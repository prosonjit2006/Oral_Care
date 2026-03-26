import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import { dentalServices } from "../../services/json/data.json";
import ServiceCard from "../../components/ServiceCard";

import img1 from "../../assets/images/landingPage/dentalServices/avatar1.png";
import img2 from "../../assets/images/landingPage/dentalServices/avatar2.png";
import img3 from "../../assets/images/landingPage/dentalServices/avatar3.png";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DentalServices = () => {
  const sliderRef = useRef<any>(null);

  // ✅ ensure loop works
  const safeData =
    dentalServices.length < 8
      ? [...dentalServices, ...dentalServices]
      : dentalServices;

  // ✅ group into 4 cards per slide
  const grouped = [];
  for (let i = 0; i < safeData.length; i += 4) {
    grouped.push(safeData.slice(i, i + 4));
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 lg:mb-12">
          <div>
            <p className="text-gray-600 text-sm sm:text-md mb-1">
              Our Services /
              <span className="text-blue-800 text-lg sm:text-xl font-semibold ml-1">
                Discover Our Dental Services
              </span>
            </p>

            <p className="text-gray-600 mt-2 sm:mt-3 max-w-sm sm:max-w-md text-xs sm:text-sm">
              Professional dental care with regular check-ups and advanced
              treatments.
            </p>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-3 mt-5 lg:mt-0">
            <div className="flex -space-x-3">
              {[img1, img2, img3].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>

            <div>
              <p className="text-lg sm:text-xl font-semibold">600+</p>
              <p className="text-gray-500 text-xs sm:text-sm">Reviews</p>
            </div>
          </div>
        </div>

        {/* Slider + Controls */}
        <div className="flex flex-col lg:flex-row items-center w-full gap-6">
          {/* Controls */}
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={() => sliderRef.current?.slidePrev()}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-blue-700 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => sliderRef.current?.slideNext()}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-blue-700 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => (sliderRef.current = swiper)}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={16}
            slidesPerView={1}
            className="w-full"
          >
            {grouped.map((group, i) => (
              <SwiperSlide key={i}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {group.map((item) => (
                    <ServiceCard key={item.id} service={item} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default DentalServices;
