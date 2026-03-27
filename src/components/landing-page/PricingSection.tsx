import BuyButton from "@/components/ui/BuyButton";
import { Check } from "lucide-react";

const link = `${process.env.NEXT_PUBLIC_APP_URL}/pricing`;

const plans = [
 {
  name: "Starter",
  tagline: "Perfect for getting started",
  price: "$2",
  discountedPrice: "$0.40",
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
  discountedPrice: "$1.40",
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
   "Early access to new features"
  ]
 }
];

const PricingSection = () => {
 return (
  <section id="pricing" className="py-20 w-full max-w-full">
   <div className="w-full mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
     <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
      <span className="heading-gradient">Pay-As-You-Go</span> – No
      Subscriptions!
     </h2>
     <p className="text-lg text-muted-foreground">
      Buy credits upfront and use them as needed. No recurring fees, just pay
      for what you use!
     </p>
    </div>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
     {plans.map((plan, i) => (
      <div
       key={i}
       className={`relative w-full max-w-md mx-auto lg:max-w-none bg-card rounded-3xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        plan.highlight
         ? "border-2 border-blue-500 shadow-xl"
         : "border border-border shadow-md"
       }`}
      >
       {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
         Best Value
        </div>
       )}
       {plan.discountedPrice && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
         80% Off!
        </div>
       )}
       <div className="mb-6">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mt-1.5">{plan.tagline}</p>
       </div>
       <div className="mb-8 flex items-baseline gap-2">
        {plan.discountedPrice ? (
         <>
          <p className="text-2xl line-through text-muted-foreground">
           {plan.price}
          </p>
          <p className="text-5xl font-extrabold tracking-tight text-blue-600">
           {plan.discountedPrice}
          </p>
         </>
        ) : (
         <p className="text-5xl font-extrabold tracking-tight">{plan.price}</p>
        )}
        <p className="text-sm font-medium text-muted-foreground">
         for {plan.credits}
        </p>
       </div>
       <div className="flex-1 mb-8">
        <p className="selft-start text-left text-sm font-semibold mb-4">
         What’s included:
        </p>
        <ul className="space-y-3">
         {plan.features.map((feature, idx) => (
          <li
           key={idx}
           className="flex items-start gap-3 text-sm text-muted-foreground"
          >
           <Check
            className="w-5 h-5 text-green-500 shrink-0"
            strokeWidth={2.5}
           />
           <span className="leading-tight">{feature}</span>
          </li>
         ))}
        </ul>
       </div>
       <div className="mt-auto pt-6 border-t border-border">
        <BuyButton purchaseLink={plan.link} />
       </div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default PricingSection;
