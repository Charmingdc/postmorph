import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter 🍿",
      tagline: "Perfect for testing the waters",
      price: "$5",
      credits: "30 Credits",
      button: "Buy Credits",
      features: [
        "One-time payment",
        "No subscription fees",
        "Full access to all features",
        "Credits never expire",
        "Pay only for what you use"
      ]
    },
    {
      name: "Creator 🍿🍿",
      tagline: "Best for content creators",
      price: "$12",
      credits: "100 Credits",
      button: "Buy Credits",
      features: [
        "One-time payment",
        "No subscription fees",
        "Full access to all features",
        "Credits never expire",
        "Pay only for what you use",
        "Email support"
      ],
      highlight: true // Best Value
    },
    {
      name: "Pro 🍿🍿🍿",
      tagline: "For power users & teams",
      price: "$25",
      credits: "220 Credits",
      button: "Buy Credits",
      features: [
        "Everything in Creator",
        "Priority support",
        "Advanced analytics",
        "Early access to new features",
        "Content refinement limits extended"
      ]
    }
  ];

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6 pt-6">
      {plans.map((plan, i) => (
        <div
          key={i}
          className={`relative w-full bg-card border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${
            plan.highlight
              ? "border-blue-500 shadow-xl scale-105"
              : "border-gray-200 shadow-md"
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
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition">
            {plan.button}
          </button>

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
  );
};

export default PricingSection;
