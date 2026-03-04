import type { ReviewProps } from "../type/type/global.type";

const ReviewsRow = ({ direction = "left", data }: ReviewProps) => {
  return (
    <div className="relative overflow-hidden py-6 sm:py-8">
      <div
        className={`flex gap-4 sm:gap-5 md:gap-6 w-max animate-marquee ${
          direction === "right" ? "reverse" : ""
        }`}
      >
        {[...data, ...data].map((item) => {
          if (item.type === "image") {
            return (
              <div
                key={item.id}
                className="w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] xl:w-[420px] 
                           h-[160px] sm:h-[190px] md:h-[210px] lg:h-[230px] xl:h-[260px] 
                           rounded-2xl overflow-hidden flex-shrink-0"
              >
                <img
                  src={item.image}
                  alt="review"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className="bg-gray-200 rounded-2xl p-4 sm:p-5 md:p-6 
                         w-[240px] sm:w-[280px] md:w-[310px] lg:w-[330px] xl:w-[350px] 
                         flex-shrink-0"
            >
              <h3 className="text-base sm:text-lg font-semibold">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
                {item.description}
              </p>

              <div className="flex items-center gap-3 mt-4 sm:mt-6">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-xs sm:text-sm">{item.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsRow;
