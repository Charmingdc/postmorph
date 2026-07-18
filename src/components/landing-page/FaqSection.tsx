"use client";

import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What is content repurposing?",
    answer:
      "Content repurposing is the process of taking one piece of content and adapting it into multiple formats to reach different audiences across various platforms. For example, turning a podcast episode into a blog post, social media posts, and video clips.",
  },
  {
    question: "How does your AI repurpose my content?",
    answer:
      "Our AI analyzes your original content to understand its core message and key points. It then restructures and reformats this content to fit different platforms while maintaining your unique voice and style.",
  },
  {
    question: "What types of content can I repurpose?",
    answer:
      "You can repurpose any of these type of contents: Youtube Videos, Instagram Reels, Blog posts, Linkedin Post, Reddit Post and we are currently working on adding support for other type of contents.",
  },
  {
    question: "How much time will this save me?",
    answer:
      "Most users report saving 5-10 hours per week on content creation. What would typically take a full day of work can be accomplished in about 15-30 minutes with our platform, depending on the amount and type of content you're repurposing.",
  },
  {
    question: "Will the repurposed content sound like me?",
    answer:
      "Yes! Our AI is designed to maintain your unique voice and style. You can also create custom voice profiles that the AI will use when generating new content, ensuring consistency across all your platforms.",
  },
  {
    question: "Can I edit the repurposed content before publishing?",
    answer:
      "Absolutely. While our AI creates high-quality content, you always have full control to review, edit, and refine any generated content before it goes live. Our intuitive editor makes it easy to make quick adjustments.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "No, but we provide a free plan that is always available with limited features if you want to test the platform further.",
  },
  {
    question: "Does credits expire?",
    answer:
      "No. Currently, your purchased credits does not expire but this may change in the future.",
  },
];

const FaqSection = () => {
  const headlineRef = useScrollAnimation();
  const headlineColRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const el = headlineColRef.current;
      if (!el) return;

      if (scrollingDown) {
        el.style.top = "96px";
      } else {
        el.style.top = "-9999px";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="faq" className="w-full">
      <div className="w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div
          ref={headlineColRef}
          className="lg:sticky lg:self-start p-10 lg:py-16 lg:border-r-[0.5px] border-border"
          style={{ top: "-9999px" }}
        >
          <div
            ref={headlineRef}
            className="flex flex-col gap-3 text-center md:text-left scroll-fade-in"
          >
            <h2 className="text-2xl md:text-4xl">
              Frequently Asked{" "}
              <span className="heading-gradient">Questions</span>
            </h2>
            <p className="text-muted-foreground text-md md:text-lg">
              Everything you need to know about our content repurposing
              platform.
            </p>
          </div>
        </div>

        <div className="p-10 lg:py-16">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="p-2 border-b-[0.5px] border-border first:border-t-0 last:border-b-0"
              >
                <AccordionTrigger className="py-4 hover:no-underline text-left">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-left text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
