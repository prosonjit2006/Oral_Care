import type { OurServiceCardType } from "../type/type/global.type";

const OurServiceCard = ({ item }: OurServiceCardType) => {
  const Icon = item.icon;

  return (
    <div
      className={`${item.bgColor} ${item?.height} rounded-2xl 
      p-5 sm:p-6 md:p-7 lg:p-8 
      text-center`}
    >
      <div
        className="
        w-10 h-10
        sm:w-11 sm:h-11
        md:w-12 md:h-12
        mx-auto mb-3 sm:mb-4
        flex items-center justify-center
        bg-blue-700 text-white rounded-full
        "
      >
        <Icon size={20} className="sm:size-[22px] md:size-[24px] text-white" />
      </div>

      <h3
        className="
        text-base sm:text-lg md:text-xl
        font-semibold text-blue-800
        mb-2 sm:mb-3
        "
      >
        {item.title}
      </h3>

      <p
        className="
        text-gray-600
        text-xs sm:text-sm md:text-sm
        leading-relaxed
        "
      >
        {item.description}
      </p>
    </div>
  );
};

export default OurServiceCard;
