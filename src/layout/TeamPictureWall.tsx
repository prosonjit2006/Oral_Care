import { photoWall } from "../services/json/data.json";

const TeamPictureWall = () => {
  return (
    <section className="w-full h-full py-10">
      <div className="container">
        <p className="flex items-center text-xl">
          Picture Wall /
          <span className="text-[#0C4FA7] text-3xl font-bold ml-1">
            {" "}
            Our Customers
          </span>
        </p>

        <div className=" flex flex-col items-center justify-center pt-14 gap-3">
          {/* top part  */}
          <div className="flex gap-3 items-end">
            {/* col 1 */}
            <div className="w-[330px]">
              <img src={photoWall[0]} alt="photo wall img1" />
            </div>
            {/* col 2 */}
            <div className="flex flex-col w-[180px] gap-3">
              <img src={photoWall[1]} alt="img2" />
              <img src={photoWall[2]} alt="img3" />
            </div>
            {/* col 3 */}
            <div className="w-[330px]">
              <img src={photoWall[3]} alt="img4" />
            </div>
            {/* col 4 */}
            <div className="w-[180px]">
              <img src={photoWall[4]} alt="img5" />
            </div>
          </div>

          {/* bottom part  */}
          <div className="flex gap-3 items-start">
            {/* col 1 */}
            <div className="w-[180px]">
              <img src={photoWall[5]} alt="img6" />
            </div>
            {/* col 2 */}
            <div className="w-[330px]">
              <img src={photoWall[6]} alt="img7" />
            </div>

            {/* col 3 */}
            <div className="flex flex-col w-[180px] gap-3">
              <img src={photoWall[7]} alt="img8" />
              <img src={photoWall[8]} alt="img9" />
            </div>

            {/* col 4 */}
            <div className="w-[330px]">
              <img src={photoWall[9]} alt="img10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPictureWall;
