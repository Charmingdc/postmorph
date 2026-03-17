import BuyButton from "./BuyButton";
import { Check } from "lucide-react";
import getProfile from "@/lib/user/server";

interface Plan {
 name: string;
 id: string;
 tagline: string;
 price: string;
 credits: number;
 features: string[];
 highlight?: boolean;
}

const PricingSection = async () => {
 const profile = await getProfile();

 const plans: Plan[] = [
  {
   name: "Starter",
   id: "2a5f3701-8fea-4adf-805e-1204791022e3",
   tagline: "Perfect for getting started",
   price: "$2",
   credits: 30,
   features: [
    "One-time payment",
    "No subscription fees",
    "Full access to all features",
    "Credits never expire",
    "Up to 3 edits per draft",
    "Pay only for what you use"
   ]
  },
  {
   name: "Creator",
   id: "a0748692-737e-4e39-ac8a-f10474a7bcb2",
   tagline: "Best for content creators",
   price: "$6",
   credits: 100,
   features: [
    "One-time payment",
    "No subscription fees",
    "Full access to all features",
    "Credits never expire",
    "Up to 6 edits per draft",
    "Pay only for what you use",
    "Email support"
   ],
   highlight: true
  },
  {
   name: "Pro",
   id: "38a80411-9f82-436b-88c0-fd15cddd8101",
   tagline: "For power users & teams",
   price: "$15",
   credits: 220,
   features: [
    "Everything in Creator",
    "Priority support",
    "Advanced analytics",
    "Early access to new features",
    "Up to 10 edits per draft"
   ]
  }
 ];

 return (
  <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(19rem,1fr))] gap-4 py-6">
   {plans.map(plan => (
    <div
     key={plan.id}
     className={`relative w-full bg-card border rounded-2xl py-6 px-4 flex flex-col gap-4 transition-all duration-300 ${
      plan.highlight ? "border-blue-500 shadow-xl" : "border border shadow-md"
     }`}
    >
     {plan.highlight && (
      <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
       Best Value
      </div>
     )}

     <div>
      <h2 className="text-xl font-semibold">{plan.name}</h2>
      <p className="text-sm text-muted-foreground">{plan.tagline}</p>
     </div>

     <div>
      <p className="text-3xl font-bold">{plan.price}</p>
      <p className="text-sm text-muted-foreground">
       for {plan.credits} Credits
      </p>
     </div>

     <BuyButton
      planId={plan.id}
      profile={profile}
      credits={plan.credits}
      planName={plan.name}
     />

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
 );
};

export default PricingSection;
