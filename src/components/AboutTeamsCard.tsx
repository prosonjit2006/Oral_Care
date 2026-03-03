import { ArrowUpRight } from "lucide-react";
import type { Props } from "../type/interface/global.interface";

const AboutTeamsCard = ({ team }: Props) => {
  return (
    <div className="w-full max-w-[320px] mx-auto group transition-all duration-300 hover:-translate-y-2">
      {/* Image Wrapper */}
      <div className="relative rounded-3xl overflow-hidden">
        <img
          src={team.img}
          alt={team.name}
          className="w-full h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Arrow Button */}
        <button className="absolute top-4 right-4 bg-blue-100 p-3 rounded-full transition-all duration-300 group-hover:bg-blue-600">
          <ArrowUpRight
            size={20}
            className="text-blue-700 group-hover:text-white transition-colors"
          />
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>

        <p className="text-gray-500 mt-1">{team.position}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold text-gray-900">
            {team.rating}
          </span>
          <span className="text-gray-500 text-sm">{team.reviews}</span>
        </div>
      </div>
    </div>
  );
};

export default AboutTeamsCard;
