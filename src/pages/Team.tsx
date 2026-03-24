import BonusTips from "../layout/BonusTips";
import TeamHeroSection from "../layout/TeamHeroSection";
import TeamMembers from "../layout/TeamMembers";
import TeamPictureWall from "../layout/TeamPictureWall";
import TeamVideo from "../layout/TeamVideo";

const Team = () => {
  return (
    <>
      <TeamHeroSection />
      <TeamMembers />
      <TeamVideo />
      <TeamPictureWall />
      <BonusTips />
    </>
  );
};

export default Team;
