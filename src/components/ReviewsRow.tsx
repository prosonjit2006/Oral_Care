import type { ReviewsData } from "../type/interface/global.interface";

interface Props {
  direction?: "left" | "right";
  data: ReviewsData[];
}

const ReviewsRow = ({ direction = "left", data }: Props) => {
  return (
    <div className="relative overflow-hidden py-6">

      <div
        className={`flex gap-6 w-max animate-marquee ${
          direction === "right" ? "reverse" : ""
        }`}
      >
        {[...data, ...data].map((item) => {

          if (item.type === "image") {
            return (
              <div
                key={item.id}
                className="w-[420px] h-[260px] rounded-2xl overflow-hidden flex-shrink-0"
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
              className="bg-gray-200 rounded-2xl p-6 w-[350px] flex-shrink-0"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>

              <p className="text-sm text-gray-600 mt-3">
                {item.description}
              </p>

              <div className="flex items-center gap-3 mt-6">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.role}</p>
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