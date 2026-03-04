import { ArrowUpRight } from "lucide-react";
import type { Props } from "../type/type/global.type";

const AboutTeamsCard = ({ team }: Props) => {
  return (
    <div className="w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-full mx-auto group transition-all duration-300 hover:-translate-y-2">
      {/* Image Wrapper */}
      <div className="relative rounded-3xl overflow-hidden">
        <img
          src={team.img}
          alt={team.name}
          className="w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[360px] xl:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Arrow Button */}
        <button className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-blue-100 p-2 sm:p-3 rounded-full transition-all duration-300 group-hover:bg-blue-600">
          <ArrowUpRight
            size={18}
            className="sm:size-[20px] text-blue-700 group-hover:text-white transition-colors"
          />
        </button>
      </div>

      {/* Content */}
      <div className="mt-3 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          {team.name}
        </h3>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          {team.position}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-base sm:text-lg font-semibold text-gray-900">
            {team.rating}
          </span>
          <span className="text-gray-500 text-xs sm:text-sm">
            {team.reviews}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutTeamsCard;
