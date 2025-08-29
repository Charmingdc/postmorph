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
      "Start by connecting your initial content to our platform. We support links (youtube videos, podcast, social media post links), blogs and more"
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    title: "2. Choose a tone",
    description:
      "Select the tone and style that best fits your brand and audience. Our AI will adapt your content to match."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "3. Select your output formats",
    description:
      "Choose which formats you want to convert your content into - blog posts, twitter thread, Linkedln post, newsletters, and more."
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: "4. Share everywhere",
    description:
      "Copy your repurposed content or publish directly to your connected platforms with just a few clicks."
  }
];

const HowItWorks = () => {
  const router = useRouter();
  const headerRef = useScrollAnimation();
  const buttonRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="py-28">
      <div className="w-full px-4 md:px-6 xl:px-0">
        <div
          ref={headerRef as any}
          className="text-center max-w-3xl mx-auto mb-20 scroll-fade-in"
        >
          <h2 className="text-2xl font-bold mb-2">
            <span className="heading-gradient">How it works</span>
          </h2>
          <p className="text-muted-foreground text-md">
            Our simple 4-step process makes content repurposing effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 -mt-2">
          {steps.map((step, index) => {
            const stepRef = useScrollAnimation({
              threshold: 0.1,
              rootMargin: `${index * 50}px 0px`
            });

            const animationClass =
              index % 2 === 0 ? "scroll-fade-in-left" : "scroll-fade-in-right";
            const tiltAngle = index % 2 === 0 ? "rotate-4" : "-rotate-4";

            return (
              <div
                key={index}
                ref={stepRef as any}
                className={`relative flex flex-col items-center text-center ${animationClass} rounded-xl p-6 bg-card backdrop-blur-sm shadow-sm transform ${tiltAngle} transition-all duration-300
                hover:shadow-md`}
                style={
                  {
                    transitionDelay: `${index * 100}ms`,
                    "--tilt": index % 2 === 0 ? "2deg" : "-2deg"
                  } as React.CSSProperties
                }
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

        <div
          ref={buttonRef as any}
          className="text-center mt-12 scroll-fade-in"
        >
          <Button
            size="lg"
            className="button-pulse rounded-xl"
            onClick={() => router.push("/auth/signup")}
          >
            Try it for free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
