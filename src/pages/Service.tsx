import ServiceHeroSection from "../Section/Service/ServiceHeroSection";
import OurService from "../Section/Service/OurService";
import OurDentalService from "../Section/Service/OurDentalService";
import AboutTeams from "../Section/Home/AboutTeams";
import AboutDental from "../Section/Service/AboutDental";

const Service = () => {
  return (
    <>
      <ServiceHeroSection />
      <OurService />
      <OurDentalService />
      <AboutTeams />
      <AboutDental />
    </>
  );
};

export default Service;
