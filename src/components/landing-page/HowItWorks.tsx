"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileSymlink, Zap, Share2, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: <FileSymlink className="h-10 w-10 text-primary" />,
    title: "1. Choose initial content",
    description:
      "Start by connecting your initial content to our platform. We support links (youtube videos, podcast, social media post links), blogs and more",
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    title: "2. Choose a tone",
    description:
      "Select the tone and style that best fits your brand and audience. Our AI will adapt your content to match.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "3. Select your output formats",
    description:
      "Choose which formats you want to convert your content into - blog posts, twitter thread, Linkedln post, newsletters, and more.",
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: "4. Share everywhere",
    description:
      "Copy your repurposed content or publish directly to your connected platforms with just a few clicks.",
  },
];

const HowItWorksHeadline = () => {
  const headerRef = useScrollAnimation();

  return (
    <section
      id="how-it-works"
      className="w-full md:w-[95%] py-16 px-4 md:px-0 md:border-x md:border-[0.5px] border-y-0 border-border overflow-x-hidden"
    >
      <div
        ref={headerRef}
        className="text-center max-w-3xl mx-auto scroll-fade-in"
      >
        <h2 className="text-2xl md:text-4xl mb-3">How it works</h2>
        <p className="text-center text-muted-foreground text-md md:text-lg">
          Our simple 4-step process makes content repurposing effortless
        </p>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  // Explicit hook calls for each step
  const stepRef0 = useScrollAnimation({ threshold: 0.1 });
  const stepRef1 = useScrollAnimation({ threshold: 0.1 });
  const stepRef2 = useScrollAnimation({ threshold: 0.1 });
  const stepRef3 = useScrollAnimation({ threshold: 0.1 });

  const stepRefs = [stepRef0, stepRef1, stepRef2, stepRef3];

  return (
    <section className="w-full md:w-[95%] md:border-x md:border-[0.5px] border-y-0 border-border overflow-x-hidden">
      <div className="w-full md:px-8 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-x divide-border [&>*]:border-[0.5px] [&>*]:border-border">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                ref={stepRefs[index]}
                className="relative flex flex-col items-center text-center p-6 transition-all duration-300"
              >
                <div className="mb-8 rounded-xl bg-secondary w-20 h-20 flex items-center justify-center z-10">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const HowItWorksButton = () => {
  const router = useRouter();
  const buttonRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="w-full md:w-[95%] py-20 md:border-x md:border-[0.5px] border-y-0 border-border overflow-x-hidden">
      <div ref={buttonRef} className="text-center scroll-fade-in">
        <Button
          size="lg"
          className="button-pulse rounded-xl shadow-sm"
          onClick={() => router.push("/auth/signup")}
        >
          Try it for free
        </Button>
      </div>
    </section>
  );
};

export { HowItWorksHeadline, HowItWorks, HowItWorksButton };
