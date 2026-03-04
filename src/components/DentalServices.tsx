import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import ServiceCard from "./ServiceCard";
import { dentalServices } from "../services/json/data.json";

import img1 from "../assets/images/landingPage/dentalServices/avatar1.png";
import img2 from "../assets/images/landingPage/dentalServices/avatar2.png";
import img3 from "../assets/images/landingPage/dentalServices/avatar3.png";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DentalServices = () => {
  const sliderRef = useRef<any>(null);

  const nextSlide = () => {
    sliderRef.current?.next();
  };

  const prevSlide = () => {
    sliderRef.current?.previous();
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-100 to-purple-100 ">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 lg:mb-12">
          {/* Left Text */}
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
              <img
                src={img1}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
              />
              <img
                src={img2}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
              />
              <img
                src={img3}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
              />
            </div>

            <div>
              <p className="text-lg sm:text-xl font-semibold">600+</p>
              <p className="text-gray-500 text-xs sm:text-sm">Reviews</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-6 lg:gap-4">
          {/* Slider Controls */}
          <div className="flex flex-row gap-3 sm:gap-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-purple-200 text-purple-700"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-blue-700 text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Slider */}
          <AwesomeSlider
            ref={sliderRef}
            bullets={false}
            buttons={false}
            className="service-slider h-fit w-full"
          >
            {Array.from({ length: Math.ceil(dentalServices.length / 4) }).map(
              (_, index) => {
                const group = dentalServices.slice(index * 4, index * 4 + 4);

                return (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                  >
                    {group.map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                );
              },
            )}
          </AwesomeSlider>
        </div>
      </div>
    </section>
  );
};

export default DentalServices;
