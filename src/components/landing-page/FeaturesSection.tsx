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
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "One-Click Repurposing",
    description:
      "Upload your content once and transform it into multiple formats with a single click.",
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
    title: "Multiple Output Formats",
    description:
      "Convert your content into blog posts, social media posts (X thread, tweet, Linkdln post...), images, and more.",
  },
  {
    icon: <VideoIcon className="h-8 w-8 text-primary" />,
    title: "Video to Text",
    description:
      "Automatically transcribe and summarize your youtube videos, tiktok videos... into text-based content.",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Blog to Social",
    description:
      "Turn your long-form blog posts into bite-sized social media content.",
  },
  {
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    title: "AI-Powered Editing",
    description: "Fine-tune your content with AI-powered editing suggestions.",
  },
  {
    icon: <ImageIcon className="h-8 w-8 text-primary" />,
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
      className="w-full md:w-[95%] py-16 px-4 md:px-0 md:border-x md:border-[0.5px] border-y-0 border-border"
    >
      <div className="w-full px-4 md:px-8">
        <div
          ref={headerRef}
          className="flex flex-col justify-center text-center max-w-3xl mx-auto scroll-fade-in"
        >
          <h2 className="text-2xl md:text-4xl mb-3">
            All the tools you need to maximize your content
          </h2>
          <p className="text-center text-muted-foreground text-md md:text-lg">
            Our platform helps you get the most out of every piece of content
            you create.
          </p>
        </div>
      </div>
    </section>
  );
};

const FeaturesSectionContent = () => {
  // Explicit hook calls for each feature
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
    <section className="w-full md:w-[95%] md:border-x md:border-[0.5px] border-y-0 border-border">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-border [&>*]:border-[0.5px] [&>*]:border-border">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                ref={featureRefs[index]}
                className="flex flex-col items-center justify-center gap-2 text-center p-8 md:p-6 hover:bg-accent transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 rounded-xl bg-secondary w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { FeaturesSectionHeadline, FeaturesSectionContent };
