"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileSymlink, Zap, Share2, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: <FileSymlink className="h-7 w-7 text-foreground" />,
    title: "1. Choose initial content",
    description:
      "Start by connecting your initial content to our platform. We support links (YouTube videos, podcasts, social media post links), blogs and more.",
  },
  {
    icon: <MessageCircle className="h-7 w-7 text-foreground" />,
    title: "2. Choose a tone",
    description:
      "Select the tone and style that best fits your brand and audience. Our AI will adapt your content to match.",
  },
  {
    icon: <Zap className="h-7 w-7 text-foreground" />,
    title: "3. Select your output formats",
    description:
      "Choose which formats you want to convert your content into — blog posts, X thread, LinkedIn post, newsletters, and more.",
  },
  {
    icon: <Share2 className="h-7 w-7 text-foreground" />,
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
      className="w-full py-16 px-4 md:px-0 bg-transparent"
    >
      <div
        ref={headerRef}
        className="text-center max-w-3xl mx-auto scroll-fade-in"
      >
        <h2 className="text-2xl md:text-4xl mb-3">How it works</h2>
        <p className="text-muted-foreground md:text-lg">
          Our simple 4-step process makes content repurposing effortless
        </p>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const stepRef0 = useScrollAnimation({ threshold: 0.1 });
  const stepRef1 = useScrollAnimation({ threshold: 0.1 });
  const stepRef2 = useScrollAnimation({ threshold: 0.1 });
  const stepRef3 = useScrollAnimation({ threshold: 0.1 });

  const stepRefs = [stepRef0, stepRef1, stepRef2, stepRef3];

  return (
    <section className="w-full">
      <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={stepRefs[index]}
            className="flex flex-col items-center text-center gap-3 py-8 px-6 md:p-8 hover:bg-accent transition-colors duration-200 outline outline-[0.5px] outline-border"
          >
            <div className="rounded-lg bg-secondary w-10 h-10 flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="font-semibold text-base">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const HowItWorksButton = () => {
  const router = useRouter();
  const buttonRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="w-full py-20">
      <div
        ref={buttonRef}
        className="w-[95%] mx-auto text-center scroll-fade-in"
      >
        <Button
          size="lg"
          className="button-pulse rounded-xl"
          onClick={() => router.push("/auth/signup")}
        >
          Try it for free
        </Button>
      </div>
    </section>
  );
};

export { HowItWorksHeadline, HowItWorks, HowItWorksButton };
