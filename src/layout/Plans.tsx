import { Check } from "lucide-react";

const Plans = () => {
  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-[#f4f7fb] relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            Plans /
            <span className="text-blue-700 font-semibold ml-2 text-lg sm:text-xl md:text-2xl">
              Affordable Care for Every Smile
            </span>
          </p>

          <button className="text-blue-700 font-medium text-sm sm:text-base hover:underline">
            View All →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {/* Monthly */}
          <div className="flex flex-col justify-between rounded-3xl border border-blue-200 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">
            <div className="p-5 sm:p-6 md:p-8">
              <p className="text-gray-700 text-sm sm:text-base">Monthly</p>

              <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                $29 <span className="text-xs sm:text-sm font-normal">/mo</span>
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-3">
                Perfect for maintaining dental health.
              </p>

              <hr className="my-5 sm:my-6 border-gray-400/40" />

              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  Basic Check-up access
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  1x-ray per year
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  5% off basic fillings
                </li>
              </ul>
            </div>

            <button className="bg-blue-100 text-center py-3 sm:py-4 font-medium text-blue-800 text-sm sm:text-base">
              Choose Monthly
            </button>
          </div>

          {/* Quarterly */}
          <div className="flex flex-col justify-between rounded-3xl border border-blue-200 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">
            <div className="p-5 sm:p-6 md:p-8">
              <p className="text-gray-700 text-sm sm:text-base">Quarterly</p>

              <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                $129 <span className="text-xs sm:text-sm font-normal">/mo</span>
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-3">
                Regular care for a brighter smile.
              </p>

              <hr className="my-5 sm:my-6 border-gray-400/40" />

              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  Free Check-up every 3 months
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  20% off on medicine
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  10% off on treatments
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  Fluoride treatment include
                </li>
              </ul>
            </div>

            <button className="bg-blue-100 text-center py-3 sm:py-4 font-medium text-blue-800 text-sm sm:text-base">
              Choose Quarterly
            </button>
          </div>

          {/* Yearly */}
          <div className="flex flex-col justify-between relative rounded-3xl border-2 border-blue-700 bg-gradient-to-br from-purple-200 to-blue-200">
            {/* Badge */}
            <span className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 rounded-full">
              Recommended
            </span>

            <div className="p-5 sm:p-6 md:p-8">
              <p className="text-gray-700 text-sm sm:text-base">Yearly</p>

              <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                $239 <span className="text-xs sm:text-sm font-normal">/mo</span>
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-3">
                Comprehensive coverage & priority.
              </p>

              <hr className="my-5 sm:my-6 border-gray-400/40" />

              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  Free Check-up quarterly
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  20% off on treatments
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-blue-700" />
                  Emergency priority Schedule
                </li>
              </ul>
            </div>

            <button className="bg-blue-800 text-white text-center py-3 sm:py-4 font-medium rounded-bl-[22px] rounded-br-[22px] text-sm sm:text-base">
              Choose Yearly
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
