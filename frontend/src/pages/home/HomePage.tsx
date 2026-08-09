import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/home/HeroSection";
import TrustedCompanies from "../../components/home/TrustedCompanies";
import FeaturesSection from "../../components/home/FeaturesSection";
import HowItWorksSection from "../../components/home/HowItWorksSection";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustedCompanies />
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
}

export default HomePage;
