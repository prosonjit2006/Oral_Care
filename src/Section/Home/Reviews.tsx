import { reviewsRowOne, reviewsRowTwo } from "../../services/json/data.json";
import ReviewsRow from "./ReviewsRow";

const Reviews = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-tr from-[#CEEBFE] to-[#EDD6FF]">
      <div className="container px-4 sm:px-6 mb-8 sm:mb-10 md:mb-12">
        <p className="text-gray-500 text-base sm:text-lg md:text-xl text-center md:text-left">
          Reviews /
          <span className="text-blue-700 font-semibold ml-2 block sm:inline text-lg sm:text-xl md:text-2xl">
            Don’t Take Our Word For It
          </span>
        </p>
      </div>

      <ReviewsRow direction="left" data={reviewsRowOne} />
      <ReviewsRow direction="right" data={reviewsRowTwo} />
    </section>
  );
};

export default Reviews;
