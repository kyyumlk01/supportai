import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/home/HeroSection";
import TrustedCompanies from "../../components/home/TrustedCompanies";
import FeaturesSection from "../../components/home/FeaturesSection";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustedCompanies />
      <FeaturesSection />
    </>
  );
}

export default HomePage;
