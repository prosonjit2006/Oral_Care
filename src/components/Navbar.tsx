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

  const linkStyle = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-blue-800 underline "
        : "text-white hover:text-blue-300"
    }`;

  const mobileLinkStyle = ({ isActive }) =>
    `text-lg transition ${
      isActive
        ? "text-blue-800 underline"
        : "text-blue-500 hover:text-blue-600"
    }`;

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
          <ul className="flex gap-6 text-sm">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                end={item.path === "/"}   // FIX for isActive
                className={linkStyle}
              >
                {item.name}
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Desktop Button */}
          <button className="hidden sm:block bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700">
            Get Appointment
          </button>

          {/* Mobile Button */}
          <button className="sm:hidden bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
            Get Appointment
          </button>

          {/* Toggle */}
          <button
            onClick={() => setOpen(prev => !prev)}
            className="lg:hidden text-white"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <ul className="flex flex-col items-center gap-6 py-6">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                end={item.path === "/"}   // FIX here also
                onClick={() => setOpen(false)}
                className={mobileLinkStyle}
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