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
      "Pay only for what you use",
    ],
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
      "Email support",
    ],
    highlight: true,
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
    ],
  },
];

const PricingSectionHeadline = () => {
  return (
    <section id="pricing" className="w-full py-16 px-4 md:px-0 bg-transparent">
      <div className="w-[95%] mx-auto text-center max-w-3xl px-4 md:px-0 animate-fade-in">
        <h2 className="text-2xl md:text-4xl mb-3">
          Pay-As-You-Go – No Subscriptions!
        </h2>
        <p className="text-center text-muted-foreground text-md md:text-lg">
          Buy credits upfront and use them as needed. No recurring fees, just
          pay for what you use!
        </p>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-8">
      <div className="w-full mx-auto">
        <div className="w-[95%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto text-left">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative w-full max-w-md mx-auto lg:max-w-none bg-accent rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1 border-[0.5px] ${
                plan.highlight ? "border-primary shadow-sm" : "border-border"
              }`}
            >
              <div className="w-full flex flex-col px-4 py-6 border-b-[0.5px] border-border">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-xl font-bold">{plan.name}</h3>

                  {plan.highlight && (
                    <div className="text-xs border-[0.5px] border-border text-muted-foreground tracking-wider px-3 py-1 rounded-md">
                      Best Value
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 mb-5">
                  {plan.tagline}
                </p>

                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </p>

                  <p className="text-sm font-medium text-muted-foreground">
                    for {plan.credits}
                  </p>
                </div>
              </div>

              <div className="w-full flex-1 px-4 py-6">
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
                        className="w-5 h-5 text-primary shrink-0"
                        strokeWidth={2.5}
                      />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto p-4 border-t-[0.5px] border-border">
                <BuyButton purchaseLink={plan.link} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { PricingSectionHeadline, PricingSection };
