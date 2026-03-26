import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Team", path: "/team" },
    { name: "Subscriptions", path: "/subscription" },
    { name: "Contact Us", path: "/contactus" },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition ${
        scrolled ? "bg-black/40 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="h-8" />

        {/* Desktop Nav */}
        <nav className="hidden lg:block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2">
          <ul className="flex gap-6 text-sm text-white">
            {navItems.map((item, i) => (
              <NavLink key={i} to={item.path}>
                {item.name}
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Button always before toggle */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hidden sm:block lg:block">
            Get Appointment
          </button>

          {/* Mobile button (same design) */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs sm:hidden">
            Get Appointment
          </button>

          {/* Toggle */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden text-white"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-800">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                onClick={() => setOpen(false)}
                className="text-lg hover:text-blue-600"
              >
                {item.name}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
