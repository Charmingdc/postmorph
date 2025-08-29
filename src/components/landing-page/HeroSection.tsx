"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Video, FileText, Image, Twitter } from "lucide-react";
import RepurposeDemo from "./RepurposeDemo";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 overflow-hidden bg-dot-pattern relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-2xl border border-primary/20 bg-accent backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary">
              <span className="animate-pulse-subtle mr-2">🚀</span>
              Transform your content effortlessly
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight animate-fade-in">
              Turn
              <span className="heading-gradient">one piece of content</span>
              into dozens
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground animate-fade-in max-w-2xl"
              style={{ animationDelay: "100ms" }}
            >
              Save hours of work by automatically repurposing your videos,
              podcasts, and blog posts into multiple formats for all your
              marketing channels.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <Button size="lg" className="button-pulse rounded-2xl px-6">
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl px-6">
                Watch demo
              </Button>
            </div>
            <div
              className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5 bg-card/60 backdrop-blur-sm border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                <Video className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Videos</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5 bg-card/60 backdrop-blur-sm border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Blog posts
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5 bg-card/60 backdrop-blur-sm border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                <Image className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Social images
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5 bg-card/60 backdrop-blur-sm border border-primary/5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20">
                <Twitter className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Tweet threads
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-16 w-full max-w-lg mx-auto animate-fade-in-right">
            <RepurposeDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
