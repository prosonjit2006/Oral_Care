import { Check } from "lucide-react";

const SubscriptionPlan = () => {
  return (
    <section className="py-6 sm:py-10 md:py-14 lg:py-16 xl:py-20 bg-[#f4f7fb] relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <button className="bg-blue-500 px-3 sm:px-4 py-2 rounded-3xl text-white text-xs sm:text-sm md:text-base">
            Monthly Billing
          </button>

          <button className="bg-blue-200 px-3 sm:px-4 py-2 rounded-3xl text-xs sm:text-sm md:text-base">
            Yearly Billing
          </button>
        </div>

        {/* Cards */}
        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        gap-4 sm:gap-6 md:gap-7 lg:gap-8
        "
        >
          {/* Monthly */}
          <div className="flex flex-col justify-between rounded-3xl border border-blue-200 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">
            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                Monthly
              </p>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2">
                $29{" "}
                <span className="text-[10px] sm:text-xs md:text-sm font-normal">
                  /mo
                </span>
              </h3>

              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 mt-3">
                Perfect for maintaining dental health.
              </p>

              <hr className="my-4 sm:my-5 md:my-6 border-gray-400/40" />

              <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base">
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  Basic Check-up access
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  1x-ray per year
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  5% off basic fillings
                </li>
              </ul>
            </div>

            <div className="bg-blue-100 text-center py-2 sm:py-3 md:py-4 font-medium text-blue-800 text-xs sm:text-sm md:text-base">
              Choose Monthly
            </div>
          </div>

          {/* Quarterly */}
          <div className="flex flex-col justify-between rounded-3xl border border-blue-200 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">
            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                Quarterly
              </p>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2">
                $129{" "}
                <span className="text-[10px] sm:text-xs md:text-sm font-normal">
                  /mo
                </span>
              </h3>

              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 mt-3">
                Regular care for a brighter smile.
              </p>

              <hr className="my-4 sm:my-5 md:my-6 border-gray-400/40" />

              <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base">
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  Free Check-up every 3 months
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  20% off on medicine
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  10% off on treatments
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  Fluoride treatment include
                </li>
              </ul>
            </div>

            <div className="bg-blue-100 text-center py-2 sm:py-3 md:py-4 font-medium text-blue-800 text-xs sm:text-sm md:text-base">
              Choose Quarterly
            </div>
          </div>

          {/* Yearly */}
          <div className="flex flex-col justify-between relative rounded-3xl border-2 border-blue-700 bg-gradient-to-br from-purple-200 to-blue-200">
            {/* Badge */}
            <span className="absolute -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 rounded-full">
              Recommended
            </span>

            <div className="p-4 sm:p-5 md:p-6 lg:p-8">
              <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                Yearly
              </p>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2">
                $239{" "}
                <span className="text-[10px] sm:text-xs md:text-sm font-normal">
                  /mo
                </span>
              </h3>

              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 mt-3">
                Comprehensive coverage & priority.
              </p>

              <hr className="my-4 sm:my-5 md:my-6 border-gray-400/40" />

              <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base">
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  Free Check-up quarterly
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  20% off on treatments
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <Check size={16} className="sm:size-[18px] text-blue-700" />
                  Emergency priority Schedule
                </li>
              </ul>
            </div>

            <div className="bg-blue-800 text-white text-center py-2 sm:py-3 md:py-4 font-medium rounded-bl-[22px] rounded-br-[22px] text-xs sm:text-sm md:text-base">
              Choose Yearly
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlan;
