import type { DentalService } from "../type/interface/global.interface";

interface Props {
  service: DentalService;
}

const ServiceCard = ({ service }: Props) => {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer">

      {/* Image */}
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-[220px] sm:h-[240px] md:h-[260px] object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Title */}
      <div className="absolute bottom-4 left-4 text-white text-sm sm:text-base font-medium">
        {service.title}
      </div>

      {/* Arrow button */}
      <div className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#0C4FA7] text-white text-sm transition-transform duration-300 group-hover:scale-110">
        →
      </div>

    </div>
  );
};

export default ServiceCard;