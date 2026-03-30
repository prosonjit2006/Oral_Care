import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { plans } from "../../services/json/data.json";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("plan");
    if (saved) setSelectedPlan(saved);
  }, []);

  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem("plan", selectedPlan);
    }
  }, [selectedPlan]);

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-[#f4f7fb] relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        {/* header */}
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

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {plans.map((itm) => {
            const isActive = selectedPlan === itm.id;

            return (
              <div
                key={itm.id}
                onClick={() => setSelectedPlan(itm.id)}
                className={`flex flex-col justify-between rounded-3xl relative border cursor-pointer transition-all duration-300
                  ${
                    isActive
                      ? "border-blue-700 bg-blue-200 scale-[1.02]"
                      : "border-blue-200 bg-gradient-to-br from-purple-200 to-blue-200"
                  }
                `}
              >
                {/* badge */}
                {itm.isRecommended && (
                  <span className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 rounded-full">
                    Recommended
                  </span>
                )}

                <div className="p-5 sm:p-6 md:p-8">
                  <p className="text-gray-700 text-sm sm:text-base">
                    {itm.title}
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                    ${itm.price}
                    <span className="text-xs sm:text-sm font-normal">
                      {itm.durationLabel}
                    </span>
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 mt-3">
                    {itm.description}
                  </p>

                  <hr className="my-5 sm:my-6 border-gray-400/40" />

                  <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    {itm.features.map((data) => (
                      <li key={data.id} className="flex items-center gap-3">
                        <Check size={18} className="text-blue-700" />
                        {data.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevents double trigger
                    setSelectedPlan(itm.id);
                  }}
                  className={`text-center py-3 sm:py-4 font-medium rounded-bl-[22px] rounded-br-[22px] text-sm sm:text-base transition-all duration-300
                    ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-gray-200"
                    }
                  `}
                >
                  {isActive ? "Selected" : `Choose ${itm.title}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Plans;
