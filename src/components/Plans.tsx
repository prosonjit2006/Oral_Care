import { Check } from "lucide-react";

const Plans = () => {
  return (
    <section className="py-20 bg-[#f4f7fb] relative overflow-hidden">
      <div className="container">

        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <p className="text-gray-600 text-lg">
            Plans /
            <span className="text-blue-700 font-semibold ml-2 text-2xl">
              Affordable Care for Every Smile
            </span>
          </p>

          <button className="text-blue-700 font-medium hover:underline">
            View All →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Monthly */}
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">

            <div className="p-8">
              <p className="text-gray-700">Monthly</p>
              <h3 className="text-3xl font-bold mt-2">
                $29 <span className="text-sm font-normal">/mo</span>
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                Perfect for maintaining dental health.
              </p>

              <hr className="my-6 border-gray-400/40" />

              <ul className="space-y-4">
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

            <div className="bg-blue-100 text-center py-4 font-medium text-blue-800">
              Choose Monthly
            </div>
          </div>

          {/* Quarterly */}
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">

            <div className="p-8">
              <p className="text-gray-700">Quarterly</p>
              <h3 className="text-3xl font-bold mt-2">
                $129 <span className="text-sm font-normal">/mo</span>
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                Regular care for a brighter smile.
              </p>

              <hr className="my-6 border-gray-400/40" />

              <ul className="space-y-4">
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

            <div className="bg-blue-100 text-center py-4 font-medium text-blue-800">
              Choose Quarterly
            </div>
          </div>

          {/* Yearly (Highlighted) */}
          <div className="relative rounded-3xl border-2 border-blue-700 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">

            {/* Recommended Badge */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs px-4 py-1 rounded-full">
              Recommended
            </span>

            <div className="p-8">
              <p className="text-gray-700">Yearly</p>
              <h3 className="text-3xl font-bold mt-2">
                $239 <span className="text-sm font-normal">/mo</span>
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                Comprehensive coverage & priority.
              </p>

              <hr className="my-6 border-gray-400/40" />

              <ul className="space-y-4">
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

            <div className="bg-blue-800 text-white text-center py-4 font-medium">
              Choose Yearly
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Plans;