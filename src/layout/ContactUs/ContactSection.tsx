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
    <section className="py-12 md:py-20 bg-gradient-to-r from-[#b7cbe0] to-[#d4c7df]">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 ">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Title */}
            <p className="text-gray-700 mb-2 ">
              Lorem Ipsam /
              <span className="text-blue-800 text-xl md:text-3xl font-semibold ml-2 ">
                Get In Touch With Us
              </span>
            </p>

            <h3 className="font-semibold text-lg mt-4">We are here from you</h3>

            <p className="text-gray-700 mt-4 max-w-max">
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
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-3">
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

    </section>
  );
};

export default ContactSection;
