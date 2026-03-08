import doctorImg from "../assets/images/contuctUs/doctor.png";

const KnowImprovement = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#b7cbe0] to-[#d4c7df] py-16">
      <div className="container  z-10">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          {/* LEFT SIDE */}
          <div>
            {/* Title */}
            <p className="text-gray-700 mb-8">
              Lorem Ipsam /
              <span className="text-blue-800 text-xl md:text-2xl font-semibold ml-1">
                Let Us Know How We Improve
              </span>
            </p>

            {/* Form */}
            <form className="space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="bg-blue-200/60 rounded-full px-5 py-3 outline-none w-full"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-blue-200/60 rounded-full px-5 py-3 outline-none w-full"
                />

                <input
                  type="date"
                  className="bg-blue-200/60 rounded-full px-5 py-3 outline-none w-full"
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="bg-blue-200/60 rounded-full px-5 py-3 outline-none w-full md:col-span-1"
                />

                <select className="bg-blue-200/60 rounded-full px-5 py-3 outline-none w-full md:col-span-2">
                  <option>Select Services</option>
                  <option>Dental Cleaning</option>
                  <option>Teeth Whitening</option>
                  <option>Root Canal</option>
                </select>
              </div>

              {/* Notes */}
              <textarea
                placeholder="Additional Notes"
                rows={4}
                className="bg-blue-200/60 rounded-3xl px-5 py-4 outline-none w-full"
              />

              {/* Submit */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-24 py-3 rounded-full hover:bg-blue-800 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className=" flex justify-end ">
            {/* Curved Background */}
            <div
              className="
            absolute
            right-0
            top-0
            h-full
            w-[40%]
            rounded-tl-[280px]
            bg-gradient-to-b
            from-[#b9cbe0]
            to-[#cdb7db]
            "
            />

            {/* Doctor Image */}
            <img
              src={doctorImg}
              alt="Doctor"
              className="relative z-10 max-h-[520px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowImprovement;
