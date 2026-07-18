"use client";

import {
  Zap,
  LayoutTemplate,
  VideoIcon,
  ImageIcon,
  FileText,
  Wand2,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: <Zap className="h-7 w-7 text-foreground" />,
    title: "One-Click Repurposing",
    description:
      "Upload your content once and transform it into multiple formats with a single click.",
  },
  {
    icon: <LayoutTemplate className="h-7 w-7 text-foreground" />,
    title: "Multiple Output Formats",
    description:
      "Convert your content into blog posts, social media posts (X thread, tweet, LinkedIn post...), images, and more.",
  },
  {
    icon: <VideoIcon className="h-7 w-7 text-foreground" />,
    title: "Video to Text",
    description:
      "Automatically transcribe and summarize your YouTube videos, TikTok videos into text-based content.",
  },
  {
    icon: <FileText className="h-7 w-7 text-foreground" />,
    title: "Blog to Social",
    description:
      "Turn your long-form blog posts into bite-sized social media content.",
  },
  {
    icon: <Wand2 className="h-7 w-7 text-foreground" />,
    title: "AI-Powered Editing",
    description: "Fine-tune your content with AI-powered editing suggestions.",
  },
  {
    icon: <ImageIcon className="h-7 w-7 text-foreground" />,
    title: "Image Generation",
    description:
      "Create eye-catching images and graphics from your text content.",
  },
];

const FeaturesSectionHeadline = () => {
  const headerRef = useScrollAnimation();

  return (
    <section
      id="features"
      className="w-full py-16 px-4 md:px-0 bg-accent md:bg-transparent"
    >
      <div
        ref={headerRef}
        className="flex flex-col justify-center text-center max-w-3xl mx-auto px-4 md:px-8 scroll-fade-in"
      >
        <h2 className="text-2xl md:text-4xl mb-3">
          All the tools you need to maximize your content
        </h2>
        <p className="text-center text-muted-foreground md:text-lg">
          Our platform helps you get the most out of every piece of content you
          create.
        </p>
      </div>
    </section>
  );
};

const FeaturesSectionContent = () => {
  const featureRef0 = useScrollAnimation({ threshold: 0.1 });
  const featureRef1 = useScrollAnimation({ threshold: 0.1 });
  const featureRef2 = useScrollAnimation({ threshold: 0.1 });
  const featureRef3 = useScrollAnimation({ threshold: 0.1 });
  const featureRef4 = useScrollAnimation({ threshold: 0.1 });
  const featureRef5 = useScrollAnimation({ threshold: 0.1 });

  const featureRefs = [
    featureRef0,
    featureRef1,
    featureRef2,
    featureRef3,
    featureRef4,
    featureRef5,
  ];

  return (
    <section className="w-full">
      <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 overflow-hidden">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={featureRefs[index]}
            className="flex flex-col items-center text-center gap-3 p-6 hover:bg-accent transition-colors duration-200 outline outline-[0.5px] outline-border"
          >
            <div className="rounded-lg bg-secondary w-10 h-10 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-base">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { FeaturesSectionHeadline, FeaturesSectionContent };
