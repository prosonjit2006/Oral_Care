import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceHeroSection from "../layout/ServiceHeroSection";
import OurService from "../layout/OurService";
import OurDentalService from "../layout/OurDentalService";
import AboutTeams from "../layout/AboutTeams";
import AboutDental from "../layout/AboutDental";

const Service = () => {
  return (
    <>
      <Navbar />

      <ServiceHeroSection />
      <OurService />
      <OurDentalService />
      <AboutTeams />
      <AboutDental />

      <Footer />
    </>
  );
};

export default Service;
