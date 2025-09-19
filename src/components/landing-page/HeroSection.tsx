"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, FileText, Twitter } from "lucide-react";
import TikTok from "@/components/icon/TikTok";
import RepurposeDemo from "./RepurposeDemo";
import DemoVideo from "./DemoVideo";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="pt-32 pb-20 overflow-hidden bg-dot-pattern relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-2xl border border-primary/20 bg-secondary backdrop-blur-md px-4 py-1.5 text-sm font-medium text-primary">
              <span className="animate-pulse-subtle mr-2">🚀</span>
              Transform your content effortlessly
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
              Turn
              <span className="heading-gradient"> one piece of content </span>
              into dozens
            </h1>
            <p
              className="w-[90%] text-md md:text-lg text-muted-foreground animate-fade-in max-w-2xl"
              style={{ animationDelay: "100ms" }}
            >
              Save hours of work by automatically repurposing your youtube
              videos, tiktok videos, blog posts, e.t.c into multiple formats for
              all your marketing channels.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <Button
                size="lg"
                className="button-pulse rounded-2xl px-6"
                onClick={() => router.push("/auth/signup")}
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-2xl px-6"
                  >
                    Watch demo
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[90%] rounded-2xl md:w-[65%]">
                  <DialogHeader>
                    <DialogTitle>Quick Demo</DialogTitle>
                    <DialogDescription>
                      Quick overview on how Postmorph works.
                    </DialogDescription>
                  </DialogHeader>

                  <DemoVideo />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div
              className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-card/60 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-800/20">
                <Video className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Youtube Videos
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-card/60 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-800/20">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Blog posts
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-card/60 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-800/20">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <TikTok className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  TikTok Videos
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-card/60 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-800/20">
                <Twitter className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Twitter threads
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-16 w-full mx-auto animate-fade-in-right">
            <RepurposeDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
