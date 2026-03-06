import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import PlanHeroSection from "../layout/PlanHeroSection"
import SpecialOffer from "../layout/SepcialOffer"
import SubscriptionPlan from "../layout/SubscriptionPlans"


const Subscription = () => {
  return (
    <>
        <Navbar />

        <PlanHeroSection />
        <SubscriptionPlan />
        <SpecialOffer />

        <Footer />
    </>
  )
}

export default Subscription