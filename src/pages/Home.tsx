import AboutTeams from "../layout/AboutTeams";
import AboutUs from "../layout/AboutUs";
import Appointment from "../layout/Appointment";
import Banner from "../layout/Banner";
import DentalServices from "../layout/DentalServices";
import Plans from "../layout/Plans";
import Reviews from "../layout/Reviews";
import ServicesBooking from "../layout/ServicesBooking";

const Home = () => {
  return (
    <>
      <Banner />
      <DentalServices />
      <AboutUs />
      <Appointment />
      <AboutTeams />
      <Reviews />
      <Plans />
      <ServicesBooking />
    </>
  );
};

export default Home;
