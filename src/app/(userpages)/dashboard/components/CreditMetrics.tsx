import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Plus, ChevronsUpDown } from "lucide-react";

import PowerUserBox from "./PowerUserBox";
import { ErrorBox } from "@/components/ui/errorbox";
import { Button } from "@/components/ui/button";

import fetchUserCredits from "@/lib/fetchUserCredits";
import type { CreditInfo } from "@/types/index";

const Progress = dynamic(() => import("@/components/ui/progress"), {
  ssr: false
});

const Dialog = dynamic(
  () => import("@/components/ui/dialog").then(m => m.Dialog),
  { ssr: false }
);
const DialogContent = dynamic(
  () => import("@/components/ui/dialog").then(m => m.DialogContent),
  { ssr: false }
);
const DialogTrigger = dynamic(
  () => import("@/components/ui/dialog").then(m => m.DialogTrigger),
  { ssr: false }
);
const DialogHeader = dynamic(
  () => import("@/components/ui/dialog").then(m => m.DialogHeader),
  { ssr: false }
);
const DialogFooter = dynamic(
  () => import("@/components/ui/dialog").then(m => m.DialogFooter),
  { ssr: false }
);
const DialogTitle = dynamic(
  () => import("@/components/ui/dialog").then(m => m.DialogTitle),
  { ssr: false }
);
const DialogDescription = dynamic(
  () => import("@/components/ui/dialog").then(m => m.DialogDescription),
  { ssr: false }
);
const DialogClose = dynamic(
  () => import("@/components/ui/dialog").then(m => m.DialogClose),
  { ssr: false }
);

const CreditMetrics = async ({ currentUserId }: { currentUserId: string }) => {
  try {
    const { isUnlimited, total_credits, used_credits }: CreditInfo =
      await fetchUserCredits(currentUserId);

    if (isUnlimited) {
      return <PowerUserBox />;
    }

    const remaining = total_credits - used_credits;
    const progress =
      total_credits === 0 ? 0 : (used_credits / total_credits) * 100;

    return (
      <div className="w-full h-auto flex flex-col bg-card p-4 border rounded-xl transition-all duration-500 hover:border-primary">
        <h2 className="font-bold">Credits Remaining</h2>

        <h3 className="text-4xl font-bold my-4">{remaining}</h3>

        <p className="mb-2">
          <strong>{`${progress.toFixed(1)}%`}</strong> of credits used
        </p>

        <Suspense fallback={<div className="h-2 bg-muted rounded-md" />}>
          <Progress value={progress} />
        </Suspense>

        <div className="w-full flex items-center justify-between gap-2 mt-6">
          <Link
            href="/pricing"
            className="w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-3 rounded-lg transition-all duration-500 hover:opacity-80"
          >
            <Plus /> Buy Credits
          </Link>

          <Suspense fallback={<div className="w-full h-10 bg-muted rounded" />}>
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

                <ul className="flex flex-col items-start">
                  <li>
                    Blog → X thread – <strong>2</strong> credits
                  </li>
                </ul>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <ErrorBox message="Failed to load your credits usage" />;
  }
};

export default CreditMetrics;
