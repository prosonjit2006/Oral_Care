import AboutTeams from "../layout/Home/AboutTeams";
import AboutUs from "../layout/Home/AboutUs";
import Appointment from "../layout/Home/Appointment";
import Banner from "../layout/Home/Banner";
import DentalServices from "../layout/Home/DentalServices";
import Plans from "../layout/Home/Plans";
import Reviews from "../layout/Home/Reviews";
import ServicesBooking from "../layout/Home/ServicesBooking";

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
