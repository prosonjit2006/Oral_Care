import { useState } from "react";
import {
  bottomLinks,
  contactLinks,
  navigationLinks,
  socialLinks,
} from "../../services/json/data.json";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [language, setLanguage] = useState<"eng" | "hin">("eng");
  // const navigate = useNavigate()

  return (
    <footer className="bg-[#030b2a] text-white pt-10 sm:pt-12 md:pt-16 lg:h-[550px] h-auto relative overflow-hidden">
      <div className="container px-4 sm:px-6">
        {/* top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* brand */}
          <div>
            <div className="logo">
              <a href="#">
                <img
                  src="/footer-logo.png"
                  alt="logo"
                  className="w-36 sm:w-40 md:w-44"
                />
              </a>
            </div>

            <p className="mt-4 text-gray-400 text-sm sm:text-base">
              Precision Care. Bright Smiles.
            </p>
          </div>

          {/* navigation */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              NAVIGATION
            </h3>

            <div className="space-y-2 sm:space-y-3">
              {navigationLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    to={item.path}
                    key={index}
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition cursor-pointer text-sm sm:text-base ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-gray-400 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${
                            isActive ? "bg-blue-500" : "bg-[#CEEBFE]"
                          }`}
                        >
                          <Icon
                            size={14}
                            className={`sm:size-[16px] ${
                              isActive ? "text-white" : "text-[#0C4FA7]"
                            }`}
                          />
                        </div>
                        {item.name}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* contacts */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              CONTACTS
            </h3>

            <ul className="space-y-2 sm:space-y-3">
              {contactLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition cursor-pointer text-sm sm:text-base"
                  >
                    <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#CEEBFE]">
                      <Icon
                        size={14}
                        className="sm:size-[16px] text-[#0C4FA7]"
                      />
                    </div>

                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* social */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              SOCIAL MEDIA
            </h3>

            <ul className="space-y-2 sm:space-y-3">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition cursor-pointer text-sm sm:text-base"
                  >
                    <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#CEEBFE]">
                      <Icon
                        size={14}
                        className="sm:size-[16px] text-[#0C4FA7]"
                      />
                    </div>

                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* language toggle */}
          <div className="flex mt-4 sm:mt-6 border border-white rounded overflow-hidden h-fit w-fit">
            <button
              onClick={() => setLanguage("eng")}
              className={`px-3 sm:px-4 py-1 text-sm sm:text-base transition
      ${language === "eng" ? "bg-blue-700 text-white" : "bg-white text-black"} `}
            >
              ENG
            </button>

            <button
              onClick={() => setLanguage("hin")}
              className={`px-3 sm:px-4 py-1 text-sm sm:text-base transition
      ${language === "hin" ? "bg-blue-700 text-white" : "bg-white text-black"}
    `}
            >
              HIN
            </button>
          </div>
        </div>

        {/* footer bottom */}
        <div className="pt-8 sm:pt-10 md:pt-12 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400">
          <p className="text-center md:text-left">2026 ALL RESERVED BY ARI</p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 md:gap-8 mt-4 md:mt-0">
            {bottomLinks.map((item, index) => (
              <span key={index} className="hover:text-white cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* large background text */}
      <div
        className="absolute bottom-0 left-0 w-full text-center font-bold text-teal-900 opacity-25 whitespace-nowrap overflow-hidden
      text-[24px] sm:text-[50px] md:text-[80px] lg:text-[100px] xl:text-[110px]"
      >
        BE PROUD OF YOUR SMILE :)
      </div>
    </footer>
  );
};

export default Footer;
