import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is content repurposing?",
    answer:
      "Content repurposing is the process of taking one piece of content and adapting it into multiple formats to reach different audiences across various platforms. For example, turning a podcast episode into a blog post, social media posts, and video clips."
  },
  {
    question: "How does your AI repurpose my content?",
    answer:
      "Our AI analyzes your original content to understand its core message and key points. It then restructures and reformats this content to fit different platforms while maintaining your unique voice and style."
  },
  {
    question: "What types of content can I repurpose?",
    answer:
      "You can repurpose any of these type of contents: Youtube Videos, Instagram Reels, Blog posts, Linkedin Post, Reddit Post and we are  currently working on adding support for other type of contents."
  },
  {
    question: "How much time will this save me?",
    answer:
      "Most users report saving 5-10 hours per week on content creation. What would typically take a full day of work can be accomplished in about 15-30 minutes with our platform, depending on the amount and type of content you're repurposing."
  },
  {
    question: "Will the repurposed content sound like me?",
    answer:
      "Yes! Our AI is designed to maintain your unique voice and style. You can also create custom voice profiles that the AI will use when generating new content, ensuring consistency across all your platforms."
  },
  {
    question: "Can I edit the repurposed content before publishing?",
    answer:
      "Absolutely. While our AI creates high-quality content, you always have full control to review, edit, and refine any generated content before it goes live. Our intuitive editor makes it easy to make quick adjustments."
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "No, but we provide a free plan that is always available with limited features if you want to test the platform further."
  },
  {
    question: "Does credits expire?",
    answer:
      "No. Currently, your purchased credits does not expire but this may change in the future."
  }
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-20 md:w-[80%]">
      <div className="w-full px-4 md:px">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked <span className="heading-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-md">
            Everything you need to know about our content repurposing platform
          </p>
        </div>

        <Accordion type="single" collapsible className="animate-fade-in">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-muted mb-4 rounded-xl overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="text-left font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-left text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
