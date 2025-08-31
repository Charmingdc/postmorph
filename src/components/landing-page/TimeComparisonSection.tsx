"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from "./TabContent";

const TimeComparisonSection = () => {
  return (
    <section className="py-8 bg-background w-full overflow-visible rounded-3xl">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="heading-gradient">Save Hours</span> Every Week
          </h2>
          <p className="text-lg text-foreground">
            See how Postmorph transforms your content workflow and saves you
            valuable time
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="h-12 grid w-full grid-cols-2 px-2 mb-8 rounded-full">
            <TabsTrigger value="manual" className="h-8 rounded-full">
              Manual Method
            </TabsTrigger>
            <TabsTrigger value="postmorph" className="h-8 rounded-full">
              Postmorph Method
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <TabContent type="manual" />
          </TabsContent>

          <TabsContent value="postmorph">
            <TabContent type="postmorph" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TimeComparisonSection;
