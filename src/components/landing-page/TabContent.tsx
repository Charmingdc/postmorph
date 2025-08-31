"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  XCircle,
  CheckCircle2,
  FileText,
  Twitter,
  Linkedin,
  FileCode
} from "lucide-react";

interface TabContentProps {
  type: "manual" | "postmorph";
}

const manualPlatforms = [
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

const repurposePlatforms = [
  { name: "Blog", icon: <FileText className="h-8 w-8" />, color: "bg-primary" },
  { name: "X", icon: <Twitter className="h-8 w-8" />, color: "bg-blue-400" },
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

const TabContent = ({ type }: TabContentProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const isManual = type === "manual";

  useEffect(() => {
    const interval = setInterval(
      () => setActiveStep(prev => (prev + 1) % 7),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`bg-card rounded-2xl p-6 border ${
        isManual ? "border-border" : "border-primary"
      } relative`}
    >
      {/* Label */}
      <div
        className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
          isManual ? "bg-destructive text-white" : "bg-green-500 text-white"
        }`}
      >
        {isManual ? (
          <XCircle className="h-4 w-4" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
        <span>{isManual ? "Time-consuming" : "Time-saving"}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <span className="mr-2">
          {isManual ? "Traditional Approach" : "Postmorph Method"}
        </span>
        <span className="text-muted-foreground text-sm">
          {isManual ? "(4+ hours weekly)" : "(30 mins weekly)"}
        </span>
      </h3>

      {/* Content */}
      <div className="space-y-6">
        {isManual ? (
          manualPlatforms.map((platform, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`${platform.color} p-2 rounded-full text-white`}>
                {platform.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{platform.name}</h4>
                <div className="h-16 mt-2 border border-secondary rounded-lg overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-muted to-accent rounded-lg shadow-lg"
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
          ))
        ) : (
          <>
            {/* Single "Create Once" step */}
            <div className="flex items-start gap-4">
              <div className="bg-primary p-2 rounded-full text-white">
                <FileText className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Create Once</h4>
                <div className="h-16 mt-2 border border-secondary rounded-lg overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-muted to-primary border border-[.1rem] rounded-lg shadow-lg"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: Math.min(activeStep / 2, 1) }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                    Writing your content once...
                  </div>
                </div>
              </div>
            </div>

            {/* AI Repurposed platforms */}
            <h4 className="font-medium mb-2 ml-12">
              AI Repurposes To All Platforms
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {repurposePlatforms.map((platform, index) => (
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

            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Save 8+ hours every week by repurposing content automatically
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TabContent;
