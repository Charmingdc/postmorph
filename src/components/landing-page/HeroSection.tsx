"use client";
import RepurposeDemo from "./RepurposeDemo";

const HeroSection = () => {
  return (
    <section className="w-full py-20 overflow-x-hidden relative">
      <div className="w-[95%] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-1">
          <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight animate-fade-in">
              Turn one piece of content into dozens
            </h1>
            <p
              className="w-[95%] md:w-[80%] text-md md:text-lg text-muted-foreground animate-fade-in max-w-2xl"
              style={{ animationDelay: "100ms" }}
            >
              Save hours of work by automatically repurposing your youtube
              videos, tiktok videos, blog posts, e.t.c into multiple formats for
              all your marketing channels.
            </p>
          </div>

          <div className="relative mt-16 w-full mx-auto animate-fade-in">
            <RepurposeDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
