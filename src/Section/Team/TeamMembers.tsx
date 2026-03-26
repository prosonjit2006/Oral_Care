import { teamImages } from "../../services/json/data.json";


const TeamMembers = () => {
  return (
    <section className="py-8">
      {/* top div */}
      <div className="grid grid-cols-2 gap-4 ">
        {/* left part  */}
        <div className="p-6 bg-[#CEEBFE] rounded-2xl">
          <p className="  mb-5 text-2xl">
            Our Team /
            <span className="text-3xl">
              {" "}
              Lorem ipsum dolor sit amet, consectetur
            </span>
          </p>
          <p className=" max-w-2xl">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <button className="px-5 py-2 mt-5 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white">
            See More
          </button>
        </div>
        {/* right part */}
        <div className="flex flex-col justify-between pt-7 ">
          {/* top part */}
          <div className=" grid grid-cols-3 text-[#0C4FA7] px-8">
            <p className="flex flex-col text-center text-xl font-bold">
              15+
              <span className="text-xl">Years Experience</span>
            </p>
            <p className="flex flex-col text-center text-xl font-bold">
              4,500+
              <span className="text-xl">Happy Customer</span>
            </p>
            <p className="flex flex-col text-center text-xl font-bold">
              150+
              <span className="text-xl">Lorem Ipsam</span>
            </p>
          </div>
          {/* bottom part */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-[#EDD6FF] rounded-xl">
              <p className=" font-bold text-xl mb-2">Lorem Ipsam</p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="p-4 bg-[#EDD6FF] rounded-xl">
              <p className=" font-bold text-xl mb-2">Lorem Ipsam</p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-[480px]">
        <div className="relative group w-[320px] h-[380px]">
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
                  ? " -translate-x-52 group-hover:-translate-x-[550px] group-hover:scale-90"
                  : index === 1
                    ? " -translate-x-32 group-hover:-translate-x-[290px] group-hover:scale-95"
                    : index === 2
                      ? "group-hover:scale-[125px]"
                      : index === 3
                        ? " translate-x-32 group-hover:translate-x-[290px] group-hover:scale-95"
                        : " translate-x-52 group-hover:translate-x-[550px] group-hover:scale-90 z-0"
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
