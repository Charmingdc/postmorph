import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Copy, Edit, Trash2 } from "lucide-react";

const RepurposeDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleRepurpose = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowResult(true);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-background border border-border/20 rounded-2xl overflow-hidden">
      {/* Form Fields */}
      <div className="p-6 space-y-4">
        {/* Output Format */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Output Format
          </label>
          <div className="relative">
            <div className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/30 flex items-center justify-between cursor-not-allowed">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">tweet</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
            </div>
          </div>
        </div>

        {/* Tone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Tone</label>
          <div className="relative">
            <div className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/30 flex items-center justify-between cursor-not-allowed">
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
            <div className="w-full min-h-[20px] px-4 py-3 rounded-xl border border-border/50 bg-muted/30 cursor-not-allowed">
              <div className="text-muted-foreground text-sm">
                https://www.freecodecamp.org/news/how-to-build-micro-frontends-in-react-with-vite-and-module-federation/
              </div>
            </div>
          </div>
        </div>

        {/* Repurpose Button */}
        <Button
          onClick={handleRepurpose}
          disabled={isLoading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-200"
        >
          {isLoading ? "Repurposing..." : "Repurpose Now"}
        </Button>
      </div>

      {/* Result Preview */}
      {showResult && (
        <div className="border-t border-border/20">
          <div className="p-6">
            <div className="bg-background border border-border/30 rounded-2xl overflow-hidden">
              {/* Result Header */}
              <div className="px-4 py-3 bg-muted/20 border-b border-border/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Linkedin Post
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-muted/50"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-muted/50"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="p-4">
                <div className="text-left text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {`Excited to share insights into our commitment to Next.js! 🚀
                  
                  As a leading web development framework, Next.js offers incredible features like SSR, SSG, and API routes. At Netlify, we're dedicated to providing robust support, ensuring developers have seamless deployment options.
                  
                  Maintaining feature parity with Vercel and keeping up with Next.js updates requires significant engineering effort. We're proud to invest in this, ...`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepurposeDemo;
