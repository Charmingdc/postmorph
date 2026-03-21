import BuyButton from "@/components/ui/BuyButton";
import { Check } from "lucide-react";

const link = `${process.env.NEXT_PUBLIC_APP_URL}/pricing`;

const plans = [
 {
  name: "Starter",
  tagline: "Perfect for getting started",
  price: "$2",
  credits: "35 Credits",
  link,
  features: [
   "One-time payment",
   "No subscription fees",
   "Full access to all features",
   "Credits never expire",
   "Pay only for what you use"
  ]
 },
 {
  name: "Creator",
  tagline: "Best for content creators",
  price: "$7",
  credits: "120 Credits",
  link,
  features: [
   "One-time payment",
   "No subscription fees",
   "Full access to all features",
   "Credits never expire",
   "Pay only for what you use",
   "Email support"
  ],
  highlight: true
 },
 {
  name: "Pro",
  tagline: "For power users & teams",
  price: "$18",
  credits: "300 Credits",
  link,
  features: [
   "Everything in Creator",
   "Priority support",
   "Advanced analytics",
   "Early access to new features",
  ]
 }
];

const PricingSection = () => {
 return (
  <section id="pricing" className="py-20">
   <div className="container px-4">
    <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
     <h2 className="text-2xl font-bold mb-4">
      <span className="heading-gradient">Pay-As-You-Go</span> – No
      Subscriptions!
     </h2>
     <p className="text-muted-foreground text-md">
      Buy credits upfront and use them as needed. No recurring fees, just pay
      for what you use!
     </p>
    </div>

    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(19rem,1fr))] gap-y-6 gap-x-8 py-6 text-left -mt-6">
     {plans.map((plan, i) => (
      <div
       key={i}
       className={`relative w-full bg-card border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${
        plan.highlight ? "border-blue-500 shadow-xl" : "border border shadow-md"
       }`}
      >
       {/* Best Value badge */}
       {plan.highlight && (
        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
         Best Value
        </div>
       )}

       {/* Header */}
       <div>
        <h2 className="text-xl font-semibold">{plan.name}</h2>
        <p className="text-sm text-muted-foreground">{plan.tagline}</p>
       </div>

       {/* Price */}
       <div>
        <p className="text-3xl font-bold">{plan.price}</p>
        <p className="text-sm text-muted-foreground">for {plan.credits}</p>
       </div>

       {/* Button */}
       <BuyButton purchaseLink={plan.link} />

       {/* Features */}
       <div>
        <p className="font-medium mb-2">What’s included:</p>
        <ul className="space-y-2">
         {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm">
           <Check className="w-4 h-4 text-green-500" />
           <span>{feature}</span>
          </li>
         ))}
        </ul>
       </div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default PricingSection;
