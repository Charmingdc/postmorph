import Navbar from "@/components/landing-page/Navbar";
import HeroSection from "@/components/landing-page/HeroSection";
import FeaturesSection from "@/components/landing-page/FeaturesSection";
import HowItWorks from "@/components/landing-page/HowItWorks";
import TimeComparisonSection from "@/components/landing-page/TimeComparisonSection";
import PricingSection from "@/components/landing-page/PricingSection";
import TestimonialsSection from "@/components/landing-page/TestimonialsSection";

const Page = () => {
  return (
    <div className="w-screen flex flex-col items-center justify-center text-center px-8">
      <nav>
        <Navbar />
      </nav>

      <main className="w-screen flex flex-col items-center gap-y-10">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <TimeComparisonSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
    </div>
  );
};

export default Page;
