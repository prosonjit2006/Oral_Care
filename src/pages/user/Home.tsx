import AboutTeams from "../../Section/Home/AboutTeams";
import AboutUs from "../../Section/Home/AboutUs";
import Appointment from "../../Section/Home/Appointment";
import Banner from "../../Section/Home/Banner";
import DentalServices from "../../Section/Home/DentalServices";
import Reviews from "../../Section/Home/Reviews";
import ServicesBooking from "../../Section/Home/ServicesBooking";
import SubscriptionPlans from "../../Section/Subscription/SubscriptionPlans";


const Home = () => {
  return (
    <>
      <Banner />
      <DentalServices />
      <AboutUs />
      <Appointment />
      <AboutTeams />
      <Reviews />
      <SubscriptionPlans />
      <ServicesBooking />
    </>
  );
};

export default Home;
