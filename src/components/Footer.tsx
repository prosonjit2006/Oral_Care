import footerLogo from "../../public/footer-logo.png";

import {
  bottomLinks,
  contactLinks,
  navigationLinks,
  socialLinks,
} from "../services/json/data.json";

const Footer = () => {
  return (
    <footer className="bg-[#030b2a] text-white pt-16 relative overflow-hidden">
      <div className="container">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="logo">
              <a href="#">
                <img src={footerLogo} alt="logo" />
              </a>
            </div>
            <p className="mt-4 text-gray-400">Precision Care. Bright Smiles.</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">NAVIGATION</h3>
            <ul className="space-y-3">
              {navigationLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <Icon size={16} />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CONTACTS</h3>
            <ul className="space-y-3">
              {contactLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <Icon size={16} />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SOCIAL MEDIA</h3>
            <ul className="space-y-3">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <Icon size={16} />
                    {item.name}
                  </li>
                );
              })}
            </ul>

            {/* Language Toggle */}
            <div className="flex mt-6 border border-white rounded overflow-hidden w-max">
              <button className="px-4 py-1 bg-blue-700">ENG</button>
              <button className="px-4 py-1 bg-white text-black">HIN</button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>2026 ALL RESERVED BY ARI</p>

          <div className="flex gap-8 mt-4 md:mt-0">
            {bottomLinks.map((item, index) => (
              <span key={index} className="hover:text-white cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 w-full text-center text-[80px] md:text-[110px] font-bold text-teal-900 opacity-25 whitespace-nowrap overflow-hidden">
        BE PROUD OF YOUR SMILE :)
      </div>
    </footer>
  );
};

export default Footer;
