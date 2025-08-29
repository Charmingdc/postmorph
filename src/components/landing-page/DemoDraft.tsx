"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, CopyCheck, Trash, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import useClipboard from "@/hooks/useClipboard";

const DemoDraft = ({ setShowResult }: { setShowResult: () => void }) => {
  const { copied, copy } = useClipboard();
  const [draftContent] = useState(`
  🚀 Want faster, scalable React apps? Learn how to build micro-frontends with Vite & Module Federation!
  
  ✅ Independent deployments
  ✅ Shared dependencies
  ✅ Smaller bundles & faster load times
  
  Guide by @freeCodeCamp: https://www.freecodecamp.org/news/how-to-build-micro-frontends-in-react-with-vite-and-module-federation/
`);

  useEffect(() => {
    if (copied) {
      toast.success("Copied to clipboard successfully");
    }
  }, [copied]);

  return (
    <div className="w-[90%] flex flex-col gap-3 bg-card text-card-foreground p-4 border rounded-xl mb-3 hover:border-primary transition-all duration-300">
      {/* Type Badge */}
      <div className="w-fit bg-background text-sm capitalize py-1 px-3 rounded-full">
        Tweet
      </div>

      {/* Content Box */}
      <div className="bg-muted/20 p-2 rounded-lg text-sm">
        <div className="text-left whitespace-pre-wrap line-clamp-[12] -mt-4 mb-2">
          {draftContent}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => copy(draftContent)}>
          {copied ? <CopyCheck className="text-green-400" /> : <Copy />}
        </Button>

        <div
          className="flex items-center gap-2 p-2 border border-border rounded-lg hover:bg-accent transition-all duration-200"
          onClick={() =>
            toast.info("Signup to access Postmorph powerful content editor")
          }
        >
          <PencilLine />
        </div>

        <Button variant="destructive" onClick={() => setShowResult(false)}>
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default DemoDraft;
