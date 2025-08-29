"use client";

import {
  Zap,
  LayoutTemplate,
  VideoIcon,
  ImageIcon,
  FileText,
  Clock,
  Wand2,
  BrainCircuit
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "One-Click Repurposing",
    description:
      "Upload your content once and transform it into multiple formats with a single click."
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
    title: "Multiple Output Formats",
    description:
      "Convert your content into blog posts, social media posts (X thread, tweet, Linkdln post...), images, and more."
  },
  {
    icon: <VideoIcon className="h-8 w-8 text-primary" />,
    title: "Video to Text",
    description:
      "Automatically transcribe and summarize your youtube videos/podcasts into text-based content."
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Blog to Social",
    description:
      "Turn your long-form blog posts into bite-sized social media content."
  },
  /* {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Schedule Publishing",
    description:
      "Schedule your repurposed content to be published across platforms."
  }, */
  {
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    title: "AI-Powered Editing",
    description: "Fine-tune your content with AI-powered editing suggestions."
  },
  {
    icon: <ImageIcon className="h-8 w-8 text-primary" />,
    title: "Image Generation",
    description:
      "Create eye-catching images and graphics from your text content."
  }
];

const FeaturesSection = () => {
  const headerRef = useScrollAnimation();

  return (
    <section id="features">
      <div className="w-full px-4 md:px-6">
        <div
          ref={headerRef as any}
          className="text-center max-w-3xl mx-auto mb-12 scroll-fade-in"
        >
          <h2 className="text-2xl font-bold mb-1">
            All the tools you need to
            <span className="heading-gradient"> maximize your content</span>
          </h2>
          <p className="text-muted-foreground text-md">
            Our platform helps you get the most out of every piece of content
            you create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const featureRef = useScrollAnimation({
              threshold: 0.1,
              rootMargin: `${index * 50}px 0px`
            });

            const animationClass =
              index % 2 === 0 ? "scroll-fade-in-left" : "scroll-fade-in-right";

            return (
              <div
                key={index}
                ref={featureRef as any}
                className={`bg-card rounded-xl p-6 shadow-sm hover:blue-800/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${animationClass}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 rounded-xl bg-secondary w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-left text-xl mb-2">
                  {feature.title}
                </h3>
                <p className="text-left text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
