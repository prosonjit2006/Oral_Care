
import img from "../assets/images/landingPage/serviceBooking/img.png";

const ServicesBooking = () => {
  return (
    <section className="w-full">

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* left side - image */}
        <div className="relative h-[500px] lg:h-auto">

          
          <img
            src={img}
            alt="Dental Clinic"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="absolute bottom-10 left-10 text-white max-w-md">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Schedule Your Visit Today
            </h2>

            <p className="text-sm md:text-base mb-6 leading-relaxed">
              Taking care of your smile has never been easier. Our expert team
              is here to provide the care you deserve, at a time that works
              for you. Don’t wait - Book Your Appointment Now and take the
              first step towards better oral health.
            </p>

            <button className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-full text-sm font-medium transition">
              See More Services
            </button>
          </div>
        </div>

        {/* right side - form */}
        <div className="bg-gradient-to-tr from-[#CEEBFE] to-[#EDD6FF] p-10">

          <form className="space-y-6">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Full name*</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full mt-2 px-4 py-3 rounded-full bg-white/70 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address*</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full mt-2 px-4 py-3 rounded-full bg-white/70 outline-none"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Phone Number*</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full mt-2 px-4 py-3 rounded-full bg-white/70 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Visiting Date</label>
                <input
                  type="text"
                  placeholder="DD-MM-YYYY"
                  className="w-full mt-2 px-4 py-3 rounded-full bg-white/70 outline-none"
                />
              </div>
            </div>

            {/* Services Dropdown */}
            <div>
              <select className="w-full px-4 py-3 rounded-full bg-white/70 outline-none">
                <option>Select Services</option>
                <option>Dental Cleaning</option>
                <option>Teeth Whitening</option>
                <option>Root Canal</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <textarea
                placeholder="Additional Notes"
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-white/70 outline-none resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition"
              >
                Book Now
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ServicesBooking;