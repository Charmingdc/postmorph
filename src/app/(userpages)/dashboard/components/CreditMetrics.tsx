import Link from "next/link";
import { Plus, ChevronsUpDown } from "lucide-react";

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
            className="w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-3 rounded-lg transition-all duration-500 hover:opacity-80"
          >
            <Plus /> Buy Credits
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-3 rounded-lg transition-all duration-500 hover:opacity-80">
                <ChevronsUpDown /> Credits Cost
              </button>
            </DialogTrigger>

            <DialogContent className="w-[85%] rounded-2xl md:w-[60%]">
              <DialogHeader>
                <DialogTitle>Credits Cost</DialogTitle>
                <DialogDescription>
                  Full overview of credit cost per action
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold mb-2">✍️ Text-based Formats</h4>
                  <ul className="flex flex-col items-start gap-1">
                    <li>
                      Tweet → Other Formats – <strong>2</strong> credits
                    </li>
                    <li>
                      LinkedIn Post → Other Formats – <strong>2</strong> credits
                    </li>
                    <li>
                      Reddit Post → Other Formats – <strong>2</strong> credits
                    </li>
                    <li>
                      X Thread → Other Formats – <strong>4</strong> credits
                    </li>
                    <li>
                      Blog → Other Formats – <strong>4</strong> credits
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    🎥 Media Formats (Coming Soon 🚀)
                  </h4>
                  <ul className="flex flex-col items-start gap-1">
                    <li>
                      YouTube Video → Other Formats – <strong>6</strong> credits
                    </li>
                    <li>
                      Instagram Reel → Other Formats – <strong>8</strong>{" "}
                      credits
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
