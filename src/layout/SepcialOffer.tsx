import { offers } from "../services/json/data.json";

const SpecialOffer = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 bg-[#f4f7fb] relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-800">
            Special offers & Discounts
          </h2>

          <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">
            Maximum your benefits with additional perks
          </p>
        </div>

        {/* Cards */}
        <div
          className="
        max-w-4xl mx-auto
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        gap-4 sm:gap-5 md:gap-6
        "
        >
          {offers.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#c7d9ea] to-[#d8c5e7]"
              >
                {/* Icon */}
                <div className="flex items-center content-between gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center bg-blue-700 rounded-full text-white">
                    <Icon size={16} className="sm:size-[18px]" />
                  </div>

                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg mb-1">
                    {item.title}
                  </h3>
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
