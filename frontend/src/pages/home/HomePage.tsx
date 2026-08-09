import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/home/HeroSection";
import TrustedCompanies from "../../components/home/TrustedCompanies";
import FeaturesSection from "../../components/home/FeaturesSection";
import HowItWorksSection from "../../components/home/HowItWorksSection";
import PricingSection from "../../components/home/PricingSection";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustedCompanies />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
    </>
  );
}

export default HomePage;
