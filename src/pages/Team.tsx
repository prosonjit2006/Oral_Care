import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TeamHeroSection from "../layout/TeamHeroSection";
import TeamMembers from "../layout/TeamMembers";
import TeamVideo from "../layout/TeamVideo";

const Team = () => {
  return <>
    <Navbar />

    <TeamHeroSection />
    <TeamMembers />
    <TeamVideo />

    <Footer />
  </>;
};

export default Team;
