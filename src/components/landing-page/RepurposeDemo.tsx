import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Copy } from "lucide-react";
import DemoDraft from "./DemoDraft";

const RepurposeDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleRepurpose = async () => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
    }, 15000);
  };

  return (
    <div className="w-[95%] mx-auto flex flex-col items-center bg-card border border rounded-2xl -mt-4 overflow-hidden">
      {/* Form Fields */}

      <div className="w-full p-6 space-y-4">
        <div className="w-full flex items-center justify-between">
          {/** Input Format **/}
          <div className="space-y-2">
            <label className="text-left text-sm font-medium text-foreground">
              Input Format
            </label>
            <div className="relative">
              <div className="w-full px-6 py-2 rounded-xl border bg-muted flex items-center justify-between gap-2 cursor-not-allowed">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Blog Post</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
              </div>
            </div>
          </div>

          {/* Output Format */}
          <div className="space-y-2">
            <label className="text-left text-sm font-medium text-foreground">
              Output Format
            </label>
            <div className="relative">
              <div className="w-full px-6 py-2 rounded-xl border bg-muted flex items-center justify-between gap-2 cursor-not-allowed">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">tweet</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Tone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Tone</label>
          <div className="relative">
            <div className="w-full px-4 py-2 rounded-xl border bg-muted flex items-center justify-between cursor-not-allowed">
              <div className="flex items-center gap-2">
                <span className="text-sm">✨</span>
                <span className="text-muted-foreground">Professional</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
            </div>
          </div>
        </div>

        {/* Content Input Area */}
        <div className="space-y-2">
          <div className="relative">
            <div className="w-full min-h-[20px] px-4 py-3 rounded-xl border bg-muted cursor-not-allowed">
              <div className="h-16 text-muted-foreground text-sm overflow-hidden">
                https://www.freecodecamp.org/news/how-to-build-micro-frontends-in-react-with-vite-and-module-federation/
              </div>
            </div>
          </div>
        </div>

        {/* Repurpose Button */}
        <Button
          onClick={handleRepurpose}
          disabled={isLoading}
          className={`w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium transition-all duration-200 ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          {isLoading ? "Repurposing..." : "Repurpose Now"}
        </Button>
      </div>

      {/* Result Preview */}
      {showResult && <DemoDraft setShowResult={setShowResult} />}
    </div>
  );
};

export default RepurposeDemo;
