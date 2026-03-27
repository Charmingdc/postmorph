import BuyButton from "./BuyButton";
import { Check } from "lucide-react";
import getProfile from "@/lib/user/server";
import type { Plan } from "../types";

const plans: Plan[] = [
 {
  name: "Starter",
  id: "pdt_0Nb8g2a0s5YKJEiEoU1VE",
  tagline: "Perfect for getting started",
  price: "$2",
  credits: 35,
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
  id: "pdt_0Nb8hFKuc6sCZBOByta85",
  tagline: "Best for content creators",
  price: "$7",
  credits: 120,
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
  id: "pdt_0Nb8hXA6aRxXtu9uj1zWn",
  tagline: "For power users & teams",
  price: "$18",
  credits: 300,
  features: [
   "Everything in Creator",
   "Priority support",
   "Advanced analytics",
   "Early access to new features"
  ]
 }
];

const PricingSection = async () => {
 const profile = await getProfile();

 return (
  <div className="relative w-full pt-4">
   <div className="text-left mb-2">
    <p className="mx-auto max-w-2xl">
     Use code <span className="font-semibold">EARLY20</span> for an exclusive launch
     discount on <span className="font-bold">Starter</span> and{" "}
     <span className="font-bold">Creator</span> plans only!
    </p>
   </div>

   <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(19rem,1fr))] gap-8 py-10 md:px-0">
    {plans.map(plan => (
     <div
      key={plan.id}
      className={`relative w-full bg-card rounded-3xl p-8 flex flex-col transition-all duration-300 hover:shadow-lg ${
       plan.highlight
        ? "border-blue-500 shadow-xl"
        : "border border-border shadow-sm"
      }`}
     >
      {plan.highlight && (
       <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
        Best Value
       </div>
      )}

      <div className="mb-6">
       <h2 className="text-xl font-bold">{plan.name}</h2>
       <p className="text-sm text-muted-foreground mt-1.5">{plan.tagline}</p>
      </div>

      <div className="mb-8 flex items-baseline gap-2">
       <p className="text-5xl font-extrabold tracking-tight">{plan.price}</p>
       <p className="text-sm font-medium text-muted-foreground">
        / {plan.credits} Credits
       </p>
      </div>

      <div className="flex-1 mb-8">
       <p className="text-sm font-semibold mb-4">What’s included:</p>
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
       <BuyButton
        planId={plan.id}
        profile={profile}
        credits={plan.credits}
        planName={plan.name}
       />
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default PricingSection;
