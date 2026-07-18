import Navbar from "@/components/landing-page/Navbar";
import HeroSection from "@/components/landing-page/HeroSection";
import Showcase from "@/components/landing-page/Showcase";
import {
  FeaturesSectionHeadline,
  FeaturesSectionContent,
} from "@/components/landing-page/FeaturesSection";
import {
  EditorSectionHeadline,
  EditorSectionContent,
} from "@/components/landing-page/EditorSection";
import {
  CustomVoiceSectionHeadline,
  CustomVoiceSection,
} from "@/components/landing-page/CustomVoiceSection";
import {
  HowItWorksHeadline,
  HowItWorks,
  HowItWorksButton,
} from "@/components/landing-page/HowItWorks";
import {
  PricingSectionHeadline,
  PricingSection,
} from "@/components/landing-page/PricingSection";
import FaqSection from "@/components/landing-page/FaqSection";
import Footer from "@/components/landing-page/Footer";
import GridRails from "@/components/landing-page/GridRails";

const HR = () => <hr className="w-full border-none h-px bg-border" />;

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <GridRails />
      <nav className="w-full relative z-10">
        <Navbar />
      </nav>
      <main className="w-full flex flex-col items-center relative z-10">
        <HeroSection />
        <HR />
        <Showcase />
        <HR />
        <FeaturesSectionHeadline />
        <HR />
        <FeaturesSectionContent />
        <HR />
        <EditorSectionHeadline />
        <HR />
        <EditorSectionContent />
        <HR />
        <CustomVoiceSectionHeadline />
        <HR />
        <CustomVoiceSection />
        <HR />
        <HowItWorksHeadline />
        <HR />
        <HowItWorks />
        <HR />
        <HowItWorksButton />
        <HR />
        <PricingSectionHeadline />
        <HR />
        <PricingSection />
        <HR />
        <FaqSection />
        <HR />
      </main>
      <footer className="w-full relative z-10">
        <Footer />
      </footer>
    </div>
  );
};

export default Page;
