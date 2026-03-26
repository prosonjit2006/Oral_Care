import doctorImg from "../../assets/images/contuctUs/doctor.png";

const brands = [
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
  "Oral Care",
];

const KnowImprovement = () => {
  return (
    <section className="relative overflow-hidden bg-[#F0F8FF]">
      {/* Top ticker */}
      <div className="w-full overflow-hidden bg-[#0D4EA6] py-[8px] sm:py-[10px] md:py-[12px]">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((item, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center text-[12px] font-medium text-white sm:text-[13px] md:text-[15px]"
            >
              <span>{item}</span>
              <span className="px-2 text-white sm:px-3 md:px-4">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Curved background attached with image area */}
      <div className="absolute inset-y-0 right-0 bottom-0 w-full">
        <div className="absolute right-0 bottom-0 h-[40%] w-[85%] rounded-tl-[120px] bg-[linear-gradient(to_right,#CEEBFE,#EDD6FF)] sm:h-[48%] sm:w-[72%] sm:rounded-tl-[150px] md:h-[58%] md:w-[58%] md:rounded-tl-[180px] lg:h-[78%] lg:w-[42%] lg:rounded-tl-[220px] xl:h-[92%] xl:w-[38%] xl:rounded-tl-[260px]" />
      </div>

      {/* Main content */}
      <div className="container relative z-10">
        <div className="grid min-h-[470px] grid-cols-1 items-center gap-8 sm:gap-9 md:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left side */}
          <div className="py-8 sm:py-9 md:py-10 lg:py-14">
            <div className="max-w-[640px]">
              <p className="mb-6 flex flex-wrap items-center text-[13px] font-normal text-[#2f2f2f] sm:mb-7 sm:text-[14px] md:mb-8 md:text-[15px]">
                <span>Lorem Ipsam/</span>
                <span className="ml-2 text-[20px] font-semibold leading-tight text-[#1452ad] sm:text-[22px] md:text-[24px] lg:text-[27px]">
                  Let Us Know How We Improve
                </span>
              </p>

              <form className="space-y-[14px] sm:space-y-[15px] md:space-y-[16px]">
                {/* Label */}
                <div>
                  <label className="mb-[6px] block pl-3 text-[13px] font-medium text-[#1f1f1f] sm:text-[14px] md:text-[15px]">
                    Full Name
                  </label>

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 gap-[12px] sm:gap-[13px] md:grid-cols-2 md:gap-[14px] lg:grid-cols-3">
                    <input
                      type="text"
                      placeholder="Full name"
                      className="h-[34px] w-full rounded-full bg-[#c7e0f1] px-4 text-[12px] text-[#2f2f2f] outline-none placeholder:text-[#6f8293] sm:h-[35px] sm:text-[12.5px] md:h-[36px] md:text-[13px]"
                    />

                    <input
                      type="email"
                      placeholder="Email Address"
                      className="h-[34px] w-full rounded-full bg-[#c7e0f1] px-4 text-[12px] text-[#2f2f2f] outline-none placeholder:text-[#6f8293] sm:h-[35px] sm:text-[12.5px] md:h-[36px] md:text-[13px]"
                    />

                    <div className="relative md:col-span-2 lg:col-span-1">
                      <input
                        type="text"
                        placeholder="Visiting Date:"
                        className="h-[34px] w-full rounded-full bg-[#c7e0f1] px-4 pr-[95px] text-[12px] text-[#6f8293] outline-none placeholder:text-[#6f8293] sm:h-[35px] sm:pr-[100px] sm:text-[12.5px] md:h-[36px] md:pr-[110px] md:text-[13px]"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-[#6f8293] sm:right-5 sm:text-[12px] md:text-[13px]">
                        DD-MM-YYYY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-[12px] sm:gap-[13px] md:grid-cols-3 md:gap-[14px]">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="h-[34px] w-full rounded-full bg-[#c7e0f1] px-4 text-[12px] text-[#2f2f2f] outline-none placeholder:text-[#6f8293] sm:h-[35px] sm:text-[12.5px] md:h-[36px] md:text-[13px]"
                  />

                  <div className="relative md:col-span-2">
                    <select
                      defaultValue=""
                      className="h-[34px] w-full appearance-none rounded-full bg-[#c7e0f1] px-4 pr-12 text-[12px] text-[#2f2f2f] outline-none sm:h-[35px] sm:text-[12.5px] md:h-[36px] md:text-[13px]"
                    >
                      <option value="" disabled>
                        Select Services
                      </option>
                      <option>Dental Cleaning</option>
                      <option>Teeth Whitening</option>
                      <option>Root Canal</option>
                    </select>

                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1d2a39] sm:right-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Notes */}
                <textarea
                  placeholder="Additional Notes"
                  rows={6}
                  className="min-h-[95px] w-full resize-none rounded-[16px] bg-[#c7e0f1] px-4 py-4 text-[12px] text-[#2f2f2f] outline-none placeholder:text-[#6f8293] sm:min-h-[100px] sm:rounded-[17px] sm:text-[12.5px] md:min-h-[108px] md:rounded-[18px] md:text-[13px]"
                />

                {/* Button */}
                <div className="flex justify-center pt-5 sm:pt-6 md:pt-7">
                  <button
                    type="submit"
                    className="h-[32px] min-w-[180px] rounded-full bg-[#1655ae] px-6 text-[12px] font-medium text-white transition hover:bg-[#124693] sm:min-w-[210px] sm:px-7 sm:text-[12.5px] md:h-[33px] md:min-w-[242px] md:px-8 md:text-[13px]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right side */}
          <div className="relative flex h-full items-end justify-center overflow-hidden lg:justify-end">
            <img
              src={doctorImg}
              alt="Doctor"
              className="relative z-10 mt-2 h-[240px] w-auto object-contain sm:h-[300px] md:h-[360px] lg:-mb-4 lg:h-[430px] xl:h-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowImprovement;
