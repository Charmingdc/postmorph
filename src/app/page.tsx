import Navbar from "@/components/landing-page/Navbar";
import HeroSection from "@/components/landing-page/HeroSection";
import Showcase from "@/components/landing-page/Showcase";
import {
  FeaturesSectionHeadline,
  FeaturesSectionContent,
} from "@/components/landing-page/FeaturesSection";
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

{
  /*import TimeComparisonSection from "@/components/landing-page/TimeComparisonSection";
import TestimonialsSection from "@/components/landing-page/TestimonialsSection";
 */
}
import Divider from "@/components/landing-page/Divider";

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <nav className="w-full flex items-center justify-center">
        <Navbar />
      </nav>

      <main className="w-full flex flex-col items-center">
        <HeroSection />
        <Divider />
        <Showcase />
        <Divider />
        <FeaturesSectionHeadline />
        <Divider />
        <FeaturesSectionContent />
        <Divider />
        <HowItWorksHeadline />
        <Divider />
        <HowItWorks />
        <Divider />
        <HowItWorksButton />
        <Divider />
        <PricingSectionHeadline />
        <Divider />
        <PricingSection />
        <Divider />
        <FaqSection />
        <Divider />

        {/*
        <TimeComparisonSection />
        <TestimonialsSection /> */}
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Page;
