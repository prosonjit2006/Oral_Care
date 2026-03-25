import BonusTips from "../layout/Team/BonusTips";
import TeamHeroSection from "../layout/Team/TeamHeroSection";
import TeamMembers from "../layout/Team/TeamMembers";
import TeamPictureWall from "../layout/Team/TeamPictureWall";
import TeamVideo from "../layout/Team/TeamVideo";

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
