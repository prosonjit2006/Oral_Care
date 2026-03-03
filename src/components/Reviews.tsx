import { reviewsRowOne, reviewsRowTwo } from "../services/json/data.json";
import ReviewsRow from "./ReviewsRow";

const Reviews = () => {
  return (
    <section className="py-16 bg-gradient-to-tr from-[#CEEBFE] to-[#EDD6FF]">

      <div className="container mb-12">
        <p className="text-gray-500 text-lg">
          Reviews /
          <span className="text-blue-700 font-semibold ml-2">
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