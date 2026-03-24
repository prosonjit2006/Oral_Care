import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const navItems = ["Home", "Services", "Team", "Subscriptions", "Contact Us"];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-sm shadow-lg transition-all duration-300" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4 px-4">
        <div className="flex items-center">
        <a href="#">
          <img src="/logo.png" alt="Oral Care Logo" className="h-8" />

        </a>
        </div>

        <nav className="hidden lg:block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2">
          <ul className="flex items-center gap-6 text-sm text-white">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="hover:text-blue-700 hover:underline transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition">
            Get Appointment
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white/90 backdrop-blur-md shadow-lg">
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-700">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href="#" className="hover:text-blue-600">
                  {item}
                </a>
              </li>
            ))}

            <button className="sm:hidden bg-blue-600 text-white px-5 py-2 rounded-full text-sm">
              Get Appointment
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
