import OurServiceCard from "../components/OurServiceCard";
import { OurServiceData } from "../services/json/data.json";

const OurService = () => {
  return (
    <section className="container py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <p className="text-gray-500 text-sm sm:text-base">Our Services</p>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800">
          Why Choose Us?
        </h2>

        <p className="max-w-full sm:max-w-lg md:max-w-xl text-gray-600 mt-2 text-sm sm:text-base">
          With a team of highly skilled professionals and the latest technology,
          we provide top-notch care in a welcoming environment.
        </p>
      </div>

      <div
        className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-2
      lg:grid-cols-4
      xl:grid-cols-4
      gap-4 sm:gap-5 md:gap-6
      items-end
      "
      >
        {OurServiceData.map((item) => (
          <OurServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default OurService;
