import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ContactSection from "../layout/ContactSection";
import ContuctUsHeroSection from "../layout/ContuctUsHeroSection";
import KnowImprovement from "../layout/KnowImprovement";

const ContactUs = () => {
  return (
    <>
      <Navbar />

      <ContuctUsHeroSection />
      <ContactSection />
      <KnowImprovement />

      <Footer />
    </>
  );
};

export default ContactUs;
