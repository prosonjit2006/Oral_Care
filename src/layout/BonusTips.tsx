import { ThumbsUp } from "lucide-react";
import { tipsImages } from "../services/json/data.json";

const BonusTips = () => {
  return (
    <section className="w-full h-full py-10">
      <div className="container">
        <p className="flex items-center text-xl">
          Bonus Tips /
          <span className="text-[#0C4FA7] text-3xl font-bold ml-1">
            {" "}
            Stay updated with dental wellness tips
          </span>
        </p>

        <div className="p-4 grid grid-cols-4 gap-4 mt-4">
          {tipsImages.map((obj) => (
            <div key={obj.id}>
              <img
                src={obj.img}
                alt="tips img"
                className="w-full h-auto object-cover hover:scale-105 transition duration-500"
              />
              <div className="flex justify-between mt-3">
                <p className="w-52">{obj.desc}</p>
                <ThumbsUp className="hover:scale-110 transition hover:text-blue-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusTips;
