import { photoWall } from "../../services/json/data.json";

const TeamPictureWall = () => {
  return (
    <section className="w-full py-10">
      <div className="container px-4">
        <p className="flex items-center text-sm md:text-xl">
          Picture Wall /
          <span className="text-[#0C4FA7] text-xl md:text-3xl font-bold ml-1">
            Our Customers
          </span>
        </p>

        {/* MOBILE + TABLET (GRID) */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden">
          {photoWall.map((img, i) => (
            <div key={i} className="w-full h-[140px] sm:h-[180px]">
              <img
                src={img}
                alt={`img-${i}`}
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* DESKTOP (EXACT SAME YOUR LAYOUT) */}
        <div className="hidden lg:flex flex-col items-center justify-center pt-14 gap-3">
          {/* top part */}
          <div className="flex gap-3 items-end">
            <div className="w-[330px]">
              <img
                src={photoWall[0]}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col w-[180px] gap-3">
              <img
                src={photoWall[1]}
                className="rounded-xl w-full h-full object-cover"
              />
              <img
                src={photoWall[2]}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <div className="w-[330px]">
              <img
                src={photoWall[3]}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <div className="w-[180px]">
              <img
                src={photoWall[4]}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>
          </div>

          {/* bottom part */}
          <div className="flex gap-3 items-start">
            <div className="w-[180px]">
              <img
                src={photoWall[5]}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <div className="w-[330px]">
              <img
                src={photoWall[6]}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col w-[180px] gap-3">
              <img
                src={photoWall[7]}
                className="rounded-xl w-full h-full object-cover"
              />
              <img
                src={photoWall[8]}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <div className="w-[330px]">
              <img
                src={photoWall[9]}
                className="rounded-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPictureWall;
