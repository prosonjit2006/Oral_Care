import imgFront from "../assets/images/about/img2.png";
import imgBack from "../assets/images/about/img1.png";

const AboutUs = () => {
  return (
    <section className="bg-[#eef2f6] py-24">

      {/* Top Small Heading */}
      <div className="container">
        <p className="text-gray-500">
          About Us /
          <span className="text-blue-700 font-semibold ml-2">
            Excellence In Dentistry With Compassionate Care
          </span>
        </p>
      </div>

      {/* Center Section */}
      <div className="container flex flex-col items-center text-center mt-20">

        {/* Cross Images */}
        <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] mb-12">

          {/* Back Image */}
          <div className="absolute inset-0 rotate-6 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={imgBack}
              alt="Dental Care"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Front Image */}
          <div className="absolute inset-0 -rotate-6 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={imgFront}
              alt="Dentist"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 max-w-3xl leading-tight">
          Excellence In Dentistry <br />
          With Compassionate Care
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-6 max-w-xl">
          Professional dental care with regular check-ups and advanced treatments.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition">
            Book Appointment
          </button>

          <button className="border border-gray-400 px-6 py-3 rounded-full hover:bg-gray-100 transition">
            About Us
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;