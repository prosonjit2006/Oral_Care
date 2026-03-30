import doctorImg from "../../assets/images/contuctUs/doctor.png";
import { brands } from "../../services/json/data.json";

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

      {/* Curved background — only visible on lg+ */}
      <div className="absolute inset-y-0 right-0 bottom-0 w-full hidden lg:block">
        <div className="absolute right-0 bottom-0 h-[78%] w-[42%] rounded-tl-[220px] bg-[linear-gradient(to_right,#CEEBFE,#EDD6FF)] xl:h-[92%] xl:w-[38%] xl:rounded-tl-[260px]" />
      </div>

      {/* Main content */}
      <div className="container relative z-10 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 items-end gap-0 lg:grid-cols-[1.15fr_0.85fr] lg:min-h-[470px]">
          {/* Left side — Form */}
          <div className="py-8 sm:py-10 md:py-12 lg:py-14">
            <div className="max-w-[640px]">
              {/* Heading */}
              <p className="mb-6 sm:mb-7 md:mb-8 flex flex-wrap items-center gap-x-2 text-[13px] font-normal text-[#2f2f2f] sm:text-[14px] md:text-[15px]">
                <span>Lorem Ipsam /</span>
                <span className="text-[20px] font-semibold leading-tight text-[#1452ad] sm:text-[22px] md:text-[24px] lg:text-[27px]">
                  Let Us Know How We Improve
                </span>
              </p>

              <form className="space-y-[14px] sm:space-y-[15px] md:space-y-[16px]">
                {/* Row 1 — Full Name label + 3 inputs */}
                <div>
                  <label className="mb-[6px] block pl-3 text-[13px] font-medium text-[#1f1f1f] sm:text-[14px] md:text-[15px]">
                    Full Name
                  </label>
                  <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 sm:gap-[12px] lg:grid-cols-3 lg:gap-[14px]">
                    <input
                      type="text"
                      placeholder="Full name"
                      className="h-[40px] w-full rounded-full bg-[#c7e0f1] px-4 text-[13px] text-[#2f2f2f] outline-none placeholder:text-[#6f8293] focus:ring-2 focus:ring-[#1452ad]/30 transition"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="h-[40px] w-full rounded-full bg-[#c7e0f1] px-4 text-[13px] text-[#2f2f2f] outline-none placeholder:text-[#6f8293] focus:ring-2 focus:ring-[#1452ad]/30 transition"
                    />
                    <div className="relative sm:col-span-2 lg:col-span-1">
                      <input
                        type="text"
                        placeholder="Visiting Date"
                        className="h-[40px] w-full rounded-full bg-[#c7e0f1] px-4 pr-[100px] text-[13px] text-[#6f8293] outline-none placeholder:text-[#6f8293] focus:ring-2 focus:ring-[#1452ad]/30 transition"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-[#6f8293] sm:text-[12px]">
                        DD-MM-YYYY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 2 — Phone + Select Service */}
                <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-3 sm:gap-[12px] md:gap-[14px]">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="h-[40px] w-full rounded-full bg-[#c7e0f1] px-4 text-[13px] text-[#2f2f2f] outline-none placeholder:text-[#6f8293] focus:ring-2 focus:ring-[#1452ad]/30 transition"
                  />
                  <div className="relative sm:col-span-2">
                    <select
                      defaultValue=""
                      className="h-[40px] w-full appearance-none rounded-full bg-[#c7e0f1] px-4 pr-12 text-[13px] text-[#2f2f2f] outline-none focus:ring-2 focus:ring-[#1452ad]/30 transition"
                    >
                      <option value="" disabled>
                        Select Services
                      </option>
                      <option>Dental Cleaning</option>
                      <option>Teeth Whitening</option>
                      <option>Root Canal</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1d2a39]"
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
                  rows={5}
                  className="min-h-[100px] w-full resize-none rounded-[18px] bg-[#c7e0f1] px-4 py-3 text-[13px] text-[#2f2f2f] outline-none placeholder:text-[#6f8293] focus:ring-2 focus:ring-[#1452ad]/30 transition"
                />

                {/* Submit Button */}
                <div className="flex justify-center pt-4 sm:pt-5 md:pt-6">
                  <button
                    type="submit"
                    className="h-[42px] min-w-[200px] rounded-full bg-[#1655ae] px-8 text-[13px] font-semibold text-white shadow-md transition hover:bg-[#124693] hover:shadow-lg active:scale-95 sm:min-w-[220px] md:min-w-[242px]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right side — Doctor image */}
          {/* On mobile: full-width centered banner with gradient bg */}
          {/* On lg+: absolutely positioned at bottom right */}
          <div className="relative flex justify-center items-end lg:justify-end">
            {/* Mobile gradient pill background */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[80%] rounded-tl-[80px] rounded-tr-[80px] bg-[linear-gradient(to_right,#CEEBFE,#EDD6FF)] lg:hidden" />

            <img
              src={doctorImg}
              alt="Doctor"
              className="relative -mb-4 z-10 w-[200px] sm:w-[240px] md:w-[280px] lg:w-auto lg:h-[430px] xl:h-[520px] object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowImprovement;
