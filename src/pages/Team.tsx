import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BonusTips from "../layout/BonusTips";
import TeamHeroSection from "../layout/TeamHeroSection";
import TeamMembers from "../layout/TeamMembers";
import TeamPictureWall from "../layout/TeamPictureWall";
import TeamVideo from "../layout/TeamVideo";

const Team = () => {
  return <>
    <Navbar />

    <TeamHeroSection />
    <TeamMembers />
    <TeamVideo />
    <TeamPictureWall />
    <BonusTips />

    <Footer />
  </>;
};

export default Team;
