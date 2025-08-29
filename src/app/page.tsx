import Navbar from "@/components/landing-page/Navbar";
import HeroSection from "@/components/landing-page/HeroSection";
import FeaturesSection from "@/components/landing-page/FeaturesSection";

const Page = () => {
  return (
    <div className="w-screen flex flex-col items-center justify-center text-center px-8">
      <nav>
        <Navbar />
      </nav>

      <main className="w-screen flex flex-col items-center gap-y-10">
        <HeroSection />
        <FeaturesSection />
        {/*
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection /> */}
      </main>
    </div>
  );
};

export default Page;
