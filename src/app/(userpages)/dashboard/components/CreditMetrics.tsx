import Link from "next/link";
import {
  Plus,
  ChevronsUpDown,
  Twitter,
  Linkedin,
  FileText,
  ListOrdered,
  FilePen,
  Youtube
} from "lucide-react";
import TikTok from "@/components/icon/TikTok";

import PowerUserBox from "./PowerUserBox";
import { ErrorBox } from "@/components/ui/errorbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

import fetchUserCredits from "@/lib/fetchUserCredits";
import type { CreditInfo } from "@/types/index";

const CreditMetrics = async ({ currentUserId }: { currentUserId: string }) => {
  try {
    const { is_unlimited, total_credits, used_credits }: CreditInfo =
      await fetchUserCredits(currentUserId);

    if (is_unlimited) {
      return <PowerUserBox />;
    }

    const remaining = Math.max(0, total_credits - used_credits);
    const progress =
      total_credits === 0 ? 0 : (used_credits / total_credits) * 100;

    return (
      <div className="w-full h-auto flex flex-col bg-card p-4 border rounded-xl transition-all duration-500 hover:border-primary">
        <h2 className="font-bold">Credits Remaining</h2>

        <h3 className="text-4xl font-bold my-4">{remaining}</h3>

        <p className="mb-2">
          <strong>{`${progress.toFixed(1)}%`}</strong> of credits used
        </p>

        <Progress
          value={progress}
          className={`
            [&>div]:transition-colors [&>div]:duration-500
            ${
              progress >= 80
                ? "[&>div]:bg-red-500"
                : progress >= 50
                ? "[&>div]:bg-yellow-500"
                : "[&>div]:bg-green-500"
            }
          `}
        />

        {/* Low credits warning */}
        {progress >= 80 && (
          <p className="mt-2 text-sm text-red-500 font-medium">
            ⚠️ Running low on credits! Consider topping up.
          </p>
        )}

        <div className="w-full flex items-center justify-between gap-2 mt-6">
          <Link
            href="/pricing"
            className="w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-[clamp(0.75rem,2vw,1rem)] rounded-lg transition-all duration-500 hover:opacity-80"
          >
            <Plus className="w-[clamp(1rem,4vw,1.75rem)] h-[clamp(1rem,4vw,1.75rem)]" />
            <span className="text-[clamp(0.875rem,2.5vw,1.125rem)]">
              Buy Credits
            </span>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-[clamp(0.75rem,2vw,1rem)] rounded-lg transition-all duration-500 hover:opacity-80">
                <ChevronsUpDown className="w-[clamp(1rem,4vw,1.75rem)] h-[clamp(1rem,4vw,1.75rem)]" />
                <span className="text-[clamp(0.875rem,2.5vw,1.125rem)]">
                  Credits Cost
                </span>
              </button>
            </DialogTrigger>

            <DialogContent className="w-[90%] rounded-2xl md:w-[65%]">
              <DialogHeader>
                <DialogTitle>Credits Cost</DialogTitle>
                <DialogDescription>
                  Full overview of credit cost per action
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-semibold mb-3 border-b pb-2">
                    ✍️ Text-based Formats
                  </h4>
                  <ul className="flex flex-col items-start text-sm divide-y divide-border rounded-lg border overflow-hidden">
                    <li className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <span className="flex items-center gap-2 text-xs">
                        <Twitter className="w-4 h-4 text-muted-foreground" />
                        Tweet → Other Formats
                      </span>
                      <strong>4 credits</strong>
                    </li>
                    <li className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <span className="flex items-center gap-2 text-xs">
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                        LinkedIn Post → Other Formats
                      </span>
                      <strong>4 credits</strong>
                    </li>
                    <li className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <span className="flex items-center gap-2 text-xs">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Reddit Post → Other Formats
                      </span>
                      <strong>4 credits</strong>
                    </li>
                    <li className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <span className="flex items-center gap-2 text-xs">
                        <ListOrdered className="w-4 h-4 text-muted-foreground" />
                        X Thread → Other Formats
                      </span>
                      <strong>4 credits</strong>
                    </li>
                    <li className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <span className="flex items-center gap-2 text-xs">
                        <FilePen className="w-4 h-4 text-muted-foreground" />
                        Blog → Other Formats
                      </span>
                      <strong>5 credits</strong>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 border-b pb-2">
                    🎥 Media Formats
                  </h4>
                  <ul className="flex flex-col items-start text-sm divide-y divide-border rounded-lg border overflow-hidden">
                    <li className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <span className="flex items-center gap-2 text-xs">
                        <Youtube className="w-4 h-4 text-muted-foreground" />
                        YouTube Video → Other Formats
                      </span>
                      <strong>8 credits</strong>
                    </li>
                    <li className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <span className="flex items-center gap-2 text-xs">
                        <TikTok className="w-4 h-4 text-muted-foreground" />
                        TikTok Video → Other Formats
                      </span>
                      <strong>8 credits</strong>
                    </li>
                  </ul>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  ⚖️ Credit costs are based on complexity and may be adjusted as
                  we add more formats to keep things fair.
                </p>
              </div>

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
      </div>
    );
  } catch (error) {
    console.error(error);
    return <ErrorBox message="Failed to load your credits usage" />;
  }
};

export default CreditMetrics;
