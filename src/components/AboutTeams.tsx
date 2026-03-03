import { aboutTeams } from "../services/json/data.json";
import AboutTeamsCard from "./AboutTeamsCard";

const AboutTeams = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container">
        {/* Section Heading */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-gray-500 text-lg">
            About Teams /
            <span className="text-blue-700 font-semibold ml-2">
              Meet The Professionals Behind Your Smile
            </span>
          </p>
        </div>

        {/* using map data send */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {aboutTeams.map((item, idx) => (
            <AboutTeamsCard key={idx} team={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeams;
