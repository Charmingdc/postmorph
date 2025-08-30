"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  CheckCircle2,
  XCircle,
  FileText,
  Twitter,
  Linkedin,
  FileCode
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TimeComparisonSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headerAnim = useScrollAnimation();
  const contentAnim = useScrollAnimation({ threshold: 0.1 });

  // Connect the animation refs to our DOM refs
  useEffect(() => {
    if (headerRef.current) {
      headerAnim(headerRef.current);
    }
    if (contentRef.current) {
      contentAnim(contentRef.current);
    }
  }, [headerAnim, contentAnim]);

  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 7;

  // Auto-advance through the steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % totalSteps);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const platforms = [
    {
      name: "Blog Post",
      icon: <FileText className="h-8 w-8" />,
      color: "bg-amber-500"
    },
    {
      name: "X Thread",
      icon: <Twitter className="h-8 w-8" />,
      color: "bg-blue-400"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-8 w-8" />,
      color: "bg-blue-600"
    },
    {
      name: "Reddit",
      icon: <FileCode className="h-8 w-8" />,
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-background w-full overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16 scroll-fade-in"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="heading-gradient">Save Hours</span> Every Week
          </h2>
          <p className="text-muted-foreground text-lg">
            See how Postmorpg transforms your content workflow and saves you
            valuable time
          </p>
        </div>

        <div ref={contentRef} className="max-w-4xl mx-auto scroll-fade-in">
          <Tabs defaultValue="manual" className="w-[80%]">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="manual">Manual Method</TabsTrigger>
              <TabsTrigger value="postmorph">Postmorph Method</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="mt-0">
              <div className="bg-card rounded-2xl p-6 border border-border/30 relative">
                <div className="absolute -top-3 -right-3 bg-destructive text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <XCircle className="h-4 w-4" />
                  <span>Time-consuming</span>
                </div>

                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">Traditional Approach</span>
                  <span className="text-muted-foreground text-sm">
                    (4+ hours weekly)
                  </span>
                </h3>

                <div className="space-y-6">
                  {platforms.map((platform, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div
                          className={`${platform.color} p-2 rounded-full text-white`}
                        >
                          {platform.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{platform.name}</h4>
                          <div className="h-16 mt-2 bg-muted/60 rounded-lg overflow-hidden relative">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-muted/60 to-muted dark:from-muted/70 dark:to-muted/60 rounded-lg shadow-sm"
                              initial={{ scaleX: 0 }}
                              animate={{
                                scaleX:
                                  activeStep >= index * 2
                                    ? Math.min((activeStep - index * 2) / 2, 1)
                                    : 0
                              }}
                              style={{ transformOrigin: "left" }}
                              transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                              Writing from scratch...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="postmorph" className="mt-0">
              <div className="bg-card rounded-2xl p-6 border border-primary/30 relative">
                <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Time-saving</span>
                </div>

                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">Postmorph Method</span>
                  <span className="text-muted-foreground text-sm">
                    (30 mins weekly)
                  </span>
                </h3>

                <div className="space-y-6">
                  {/* Source Content */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary p-2 rounded-full text-white">
                        <FileText className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Create Once</h4>
                        <div className="h-16 mt-2 bg-muted/60 rounded-lg overflow-hidden relative">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/25 to-primary/10 rounded-lg shadow-sm"
                            initial={{ scaleX: 0 }}
                            animate={{
                              scaleX:
                                activeStep >= 0
                                  ? Math.min(activeStep / 2, 1)
                                  : 0
                            }}
                            style={{ transformOrigin: "left" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Writing your content once...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Repurposed Content */}
                  <div>
                    <h4 className="font-medium mb-2 ml-12">
                      AI Repurposes To All Platforms
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {platforms.map((platform, index) => (
                        <motion.div
                          key={index}
                          className={`${platform.color} p-2 rounded-lg text-white flex flex-col items-center justify-center`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: activeStep >= 3 ? 1 : 0,
                            y: activeStep >= 3 ? 0 : 10
                          }}
                          transition={{ delay: index * 0.2, duration: 0.3 }}
                        >
                          {platform.icon}
                          <span className="text-xs mt-1">{platform.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      Save 8+ hours every week by repurposing content
                      automatically
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TimeComparisonSection;
