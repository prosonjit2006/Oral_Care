import imgFront from "../assets/images/landingPage/aboutUs/img2.png";
import imgBack from "../assets/images/landingPage/aboutUs/img1.png";

const AboutUs = () => {
  return (
    <section className="  bg-[#F0F8FF]  py-12 md:py-20">
      <div className="container">
        {/* top small heading */}

        <p className="text-gray-500 text-lg md:text-xl">
          About Us /
          <span className="text-blue-700 text-2xl md:text-4xl font-semibold ml-2 md:inline">
            Excellence In Dentistry With Compassionate Care
          </span>
        </p>

        {/* Center Section */}
        <div className=" relative flex flex-col items-center text-center mt-16 md:mt-24 ">
          {/* Cross Images */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-10 md:mb-16">
            {/* Back Image */}
            <div className="absolute inset-0 rotate-9 rounded-2xl">
              <img
                src={imgBack}
                alt="Dental Care"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Front Image */}
            <div className="absolute inset-0 -rotate-6 ">
              <img
                src={imgFront}
                alt="Dentist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className=" absolute top-24">
            {/* Title */}
            <h2 className=" text-4xl md:text-5xl text-gray-800 max-w-3xl leading-8  ">
              Excellence In Dentistry <br />
              With Compassionate Care
            </h2>

            {/* Description */}
            <p className="  mt-6 max-w-[300px] mx-auto">
              Professional dental care with regular check-ups and advanced
              treatments.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 md:mt-8 ">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition">
                Book Appointment
              </button>

              <button className="border border-gray-400 px-6 py-3 rounded-full hover:bg-gray-100 hover:border-zinc-600 transition">
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
