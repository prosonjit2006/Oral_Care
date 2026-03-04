import AboutTeamsCard from "../components/AboutTeamsCard";
import { aboutTeams } from "../services/json/data.json";

const AboutTeams = () => {
  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-gray-100">
      <div className="container px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center md:text-left">
          <p className="text-gray-500 text-base sm:text-lg md:text-xl">
            About Teams /
            <span className="text-blue-700 font-semibold ml-2 block sm:inline text-lg sm:text-xl md:text-2xl">
              Meet The Professionals Behind Your Smile
            </span>
          </p>
        </div>

        {/* using map data send */}
        <div
          className="grid 
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-5 sm:gap-6 md:gap-7 lg:gap-8"
        >
          {aboutTeams.map((data, idx) => (
            <AboutTeamsCard key={idx} team={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeams;
