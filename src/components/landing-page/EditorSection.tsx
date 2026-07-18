"use client";

import Image from "next/image";
import { PenLine, Wand2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cards = [
  {
    icon: <PenLine className="h-7 w-7 text-foreground" />,
    title: "Built-In Draft Editor",
    description:
      "Edit every generated draft with a clean, distraction-free editor before you publish or share it anywhere.",
  },
  {
    icon: <Wand2 className="h-7 w-7 text-foreground" />,
    title: "AI-Powered Refinements",
    description:
      "Rewrite, shorten, expand, or change the tone of any draft with simple AI-powered refinements.",
  },
];

const EditorSectionHeadline = () => {
  const headerRef = useScrollAnimation();

  return (
    <section className="w-full py-16 px-4 md:px-0 bg-transparent">
      <div
        ref={headerRef}
        className="flex flex-col justify-center text-center max-w-3xl mx-auto px-4 md:px-8 scroll-fade-in"
      >
        <h2 className="text-2xl md:text-4xl mb-3">Make Every Draft Yours</h2>
        <p className="text-center text-muted-foreground md:text-lg">
          Edit manually or refine with AI until it sounds exactly like you.
        </p>
      </div>
    </section>
  );
};

const EditorSectionContent = () => {
  const cardRef0 = useScrollAnimation({ threshold: 0.1 });
  const cardRef1 = useScrollAnimation({ threshold: 0.1 });
  const imageRef = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="w-full">
      <div className="w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 overflow-hidden self-start">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={index === 0 ? cardRef0 : cardRef1}
              className="flex flex-col items-center text-center gap-3 p-8 hover:bg-accent transition-colors duration-200 outline outline-[0.5px] outline-border scroll-fade-in"
            >
              <div className="rounded-lg bg-secondary w-10 h-10 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="font-semibold text-base">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={imageRef}
          className="outline outline-[0.5px] outline-border scroll-fade-in overflow-hidden"
        >
          <Image
            src="/landing/postmorph-editor-mobile.png"
            alt="Postmorph built-in draft editor"
            width={1200}
            height={900}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};

export { EditorSectionHeadline, EditorSectionContent };
