import { teamImages } from "../../services/json/data.json";

const TeamMembers = () => {
  return (
    <section className="py-6 sm:py-8 lg:py-12">
      {/* top div */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {/* left part  */}
        <div className="p-4 sm:p-6 bg-[#CEEBFE] rounded-2xl">
          <p className="mb-4 sm:mb-5 text-lg sm:text-2xl">
            Our Team /
            <span className="text-xl sm:text-3xl">
              {" "}
              Lorem ipsum dolor sit amet, consectetur
            </span>
          </p>

          <p className="max-w-full sm:max-w-2xl text-sm sm:text-base">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>

          <button className="px-4 sm:px-5 py-2 mt-4 sm:mt-5 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base">
            See More
          </button>
        </div>

        {/* right part */}
        <div className="flex flex-col justify-between pt-4 sm:pt-7">
          {/* top part */}
          <div className="grid grid-cols-3 text-[#0C4FA7] px-2 sm:px-8 gap-3 sm:gap-0">
            <p className="flex flex-col text-center text-lg sm:text-xl font-bold">
              15+
              <span className="text-sm sm:text-xl">Years Experience</span>
            </p>
            <p className="flex flex-col text-center text-lg sm:text-xl font-bold">
              4,500+
              <span className="text-sm sm:text-xl">Happy Customer</span>
            </p>
            <p className="flex flex-col text-center text-lg sm:text-xl font-bold">
              150+
              <span className="text-sm sm:text-xl">Lorem Ipsam</span>
            </p>
          </div>

          {/* bottom part */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 sm:mt-0">
            <div className="p-3 sm:p-4 bg-[#EDD6FF] rounded-xl">
              <p className="font-bold text-lg sm:text-xl mb-2">Lorem Ipsam</p>
              <p className="text-sm sm:text-base">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="p-3 sm:p-4 bg-[#EDD6FF] rounded-xl">
              <p className="font-bold text-lg sm:text-xl mb-2">Lorem Ipsam</p>
              <p className="text-sm sm:text-base">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* image section */}
      <div className="flex justify-center items-center h-[270px] sm:h-[380px] md:h-[480px] mt-6">
        <div className="relative group w-[170px] sm:w-[280px] md:w-[320px] h-[220px] sm:h-[320px] md:h-[380px]">
          {teamImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="team"
              className={`
              absolute w-full h-full object-cover rounded-2xl shadow-lg
              transition-all duration-500 ease-in-out

              ${index === 2 ? "z-40 scale-105" : "z-10"}

              ${
                index === 0
                  ? "-translate-x-20 sm:-translate-x-32 md:-translate-x-52 group-hover:-translate-x-[120px] md:group-hover:-translate-x-[550px] group-hover:scale-90"
                  : index === 1
                    ? "-translate-x-10 sm:-translate-x-20 md:-translate-x-32 group-hover:-translate-x-[80px] md:group-hover:-translate-x-[290px] group-hover:scale-95"
                    : index === 2
                      ? "group-hover:scale-110"
                      : index === 3
                        ? "translate-x-10 sm:translate-x-20 md:translate-x-32 group-hover:translate-x-[80px] md:group-hover:translate-x-[290px] group-hover:scale-95 z-10"
                        : "translate-x-20 sm:translate-x-32 md:translate-x-52 group-hover:translate-x-[120px] md:group-hover:translate-x-[550px] group-hover:scale-90 -z-10"
              }
            `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
