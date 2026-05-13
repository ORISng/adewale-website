import PublicLayout from "../../components/layout/public-layout";
import HeroSection from "../../components/sections/hero-section";
import AboutSection from "../../components/sections/about-section";
import ImpactSection from "../../components/sections/impact-section";
import ProgrammeSection from "../../components/sections/programme-section";
import DatesSection from "../../components/sections/dates-section";
import WhyPartnerSection from "../../components/sections/why-partner-section";
import SponsorshipSection from "../../components/sections/sponsorship-section";
import FounderSection from "../../components/sections/founder-section";
import RegistrationSection from "../../components/sections/registration-section";
import FaqSection from "../../components/sections/faq-section";
import FooterSection from "../../components/sections/footer-section";

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <ProgrammeSection />
      <DatesSection />
      <WhyPartnerSection />
      <SponsorshipSection />
      <FounderSection />
      <RegistrationSection />
      <FaqSection />
      <FooterSection />
    </PublicLayout>
  );
}
