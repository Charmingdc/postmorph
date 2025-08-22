import BackButton from "./components/BackButton";
import PricingSection from "./components/PricingSection";

const Pricing = async () => {
  return (
    <main className="w-full flex flex-col">
      <BackButton />
      <h1 className="font-semibold text-xl"> Buy more credits </h1>

      <PricingSection />
    </main>
  );
};

export default Pricing;
