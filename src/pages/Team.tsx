import BonusTips from "../Section/Team/BonusTips";
import TeamHeroSection from "../Section/Team/TeamHeroSection";
import TeamMembers from "../Section/Team/TeamMembers";
import TeamPictureWall from "../Section/Team/TeamPictureWall";
import TeamVideo from "../Section/Team/TeamVideo";

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
