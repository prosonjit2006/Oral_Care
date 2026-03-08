import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Twitch,
  Linkedin,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-[#b7cbe0] to-[#d4c7df]">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT SIDE */}
          <div>
            {/* Title */}
            <p className="text-gray-700 mb-2">
              Lorem Ipsam /
              <span className="text-blue-800 text-xl md:text-2xl font-semibold ml-1">
                Get In Touch With Us
              </span>
            </p>

            <h3 className="font-semibold text-lg mt-4">We are here from you</h3>

            <p className="text-gray-700 mt-4 max-w-md">
              For more info or inquiry about our products projects, and pricing
              please feel free to get in touch with us.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-700 rounded-full text-white">
                  <MapPin size={16} />
                </div>

                <p className="text-gray-800">
                  <span className="font-medium text-blue-800">Address:</span>{" "}
                  21/4 Lorem Ipsam Lane, Ipsam, Lorem- 701424
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-700 rounded-full text-white">
                  <Phone size={16} />
                </div>

                <p className="text-gray-800">
                  <span className="font-medium text-blue-800">Phone:</span>{" "}
                  +0033 4844 3833
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-700 rounded-full text-white">
                  <Mail size={16} />
                </div>

                <p className="text-gray-800">
                  <span className="font-medium text-blue-800">Email:</span>{" "}
                  Oralcare@mail.com
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-blue-800 font-medium">Follow Us:</span>

              <Facebook
                size={18}
                className="cursor-pointer hover:text-blue-600"
              />
              <Instagram
                size={18}
                className="cursor-pointer hover:text-blue-600"
              />
              <Twitter
                size={18}
                className="cursor-pointer hover:text-blue-600"
              />
              <Twitch
                size={18}
                className="cursor-pointer hover:text-blue-600"
              />
              <Linkedin
                size={18}
                className="cursor-pointer hover:text-blue-600"
              />
            </div>
          </div>

          {/* RIGHT SIDE MAP */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=Kolkata&output=embed"
              className="w-full h-[300px] md:h-[400px] lg:h-[420px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-700 h-14 mt-14"></div>

      {/* <div className="w-full bg-blue-800 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-white px-4 py-2">
            Oral Care • Oral Care • Oral Care • Oral Care • Oral Care • Oral
            Care • Oral Care •
          </span>

          <span className="text-white px-4 py-2">
            Oral Care • Oral Care • Oral Care • Oral Care • Oral Care • Oral
            Care • Oral Care •
          </span>
        </div>
      </div> */}
    </section>
  );
};

export default ContactSection;
