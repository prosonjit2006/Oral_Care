import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { dentalServices } from "../../services/json/data.json";
import ServiceCard from "../../components/ServiceCard";

import img1 from "../../assets/images/landingPage/dentalServices/avatar1.png";
import img2 from "../../assets/images/landingPage/dentalServices/avatar2.png";
import img3 from "../../assets/images/landingPage/dentalServices/avatar3.png";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DentalServices = () => {
  const sliderRef = useRef<any>(null);

  return (
    <section className="py-10 sm:py-14 lg:py-16 xl:py-20 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="container">
        {/* header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 lg:mb-10 xl:mb-12">
          <div>
            <p className="text-gray-600 text-sm mb-1">
              Our Services /
              <span className="text-blue-800 text-base sm:text-lg lg:text-xl font-semibold ml-1">
                Discover Our Dental Services
              </span>
            </p>
            <p className="text-gray-600 mt-2 max-w-xs sm:max-w-sm md:max-w-md text-xs sm:text-sm">
              Professional dental care with regular check-ups and advanced
              treatments.
            </p>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-3 mt-5 md:mt-0">
            <div className="flex -space-x-3">
              {[img1, img2, img3].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`reviewer-${i}`}
                  className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-base sm:text-lg lg:text-xl font-semibold">
                600+
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">Reviews</p>
            </div>
          </div>
        </div>

        {/* slider + controls */}
        <div className="flex flex-col lg:flex-row items-end lg:items-center w-full gap-4 lg:gap-6">
          {/* controls */}
          <div className="flex lg:flex-col gap-3">
            <button
              onClick={() => sliderRef.current?.slidePrev()}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-blue-700 hover:text-white transition"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => sliderRef.current?.slideNext()}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-blue-700 hover:text-white transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* swiper */}
          <div className="w-full min-w-0">
            <Swiper
              onSwiper={(swiper) => (sliderRef.current = swiper)}
              loop={true}
              freeMode={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 12 },
                576: { slidesPerView: 2, spaceBetween: 14 },
                768: { slidesPerView: 2, spaceBetween: 16 },
                992: { slidesPerView: 3, spaceBetween: 20 },
                1200: { slidesPerView: 4, spaceBetween: 24 },
                1400: { slidesPerView: 4, spaceBetween: 30 },
              }}
              pagination={{ clickable: true }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper !pb-8" // padding for pagination dots
            >
              {dentalServices.map((item) => (
                <SwiperSlide key={item.id}>
                  <ServiceCard service={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DentalServices;
