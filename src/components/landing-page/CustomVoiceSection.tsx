"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CustomVoiceSectionHeadline = () => {
  const headerRef = useScrollAnimation();

  return (
    <section
      id="custom-voice"
      className="w-full py-16 px-4 md:px-0 bg-transparent"
    >
      <div
        ref={headerRef}
        className="flex flex-col justify-center text-center max-w-3xl mx-auto px-4 md:px-8 scroll-fade-in"
      >
        <h2 className="text-2xl md:text-4xl mb-3">
          Your Brand Voice, Built In
        </h2>
        <p className="text-center text-muted-foreground md:text-lg">
          Define your tone once and let AI write like your brand every time.
        </p>
      </div>
    </section>
  );
};

const CustomVoiceSection = () => {
  return (
    <section
      id="showcase"
      className="w-full md:w-[95%] py-4 px-2 md:p-6 md:border-x md:border-[0.5px] border-y-0 border-border overflow-x-hidden"
    >
      <Image
        src="/landing/postmorph-custom-voice.png"
        className="w-4/5 h-auto mx-auto md:w-full md:h-full rounded-xl"
        width={1920}
        height={1280}
        alt="Postmorph repurpose page interface"
      />
    </section>
  );
};

export { CustomVoiceSectionHeadline, CustomVoiceSection };
