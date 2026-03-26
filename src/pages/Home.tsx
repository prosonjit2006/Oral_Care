import AboutTeams from "../Section/Home/AboutTeams";
import AboutUs from "../Section/Home/AboutUs";
import Appointment from "../Section/Home/Appointment";
import Banner from "../Section/Home/Banner";
import DentalServices from "../Section/Home/DentalServices";
import Plans from "../Section/Home/Plans";
import Reviews from "../Section/Home/Reviews";
import ServicesBooking from "../Section/Home/ServicesBooking";

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
