import Link from "next/link";
import { Plus, ChevronsUpDown, RotateCcw } from "lucide-react";

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

import { CREDIT_COSTS } from "@/lib/credits/credits.config";
import { TEXT_FORMATS, MEDIA_FORMATS } from "@/lib/credits/format-credits-data";

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
   <div className="w-full flex flex-col bg-card p-4 border border-border rounded-xl transition-all duration-500 hover:border-primary">
    <h2 className="font-bold text-card-foreground">Credits Remaining</h2>

    <h3 className="text-4xl font-bold my-4 text-card-foreground">
     {remaining}
    </h3>

    <p className="mb-2 text-card-foreground">
     <strong>{`${progress.toFixed(1)}%`}</strong> used
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

    {progress >= 80 && (
     <p className="mt-2 text-sm text-red-500 font-medium">
      ⚠ Running low on credits!
     </p>
    )}

    <div className="w-full flex items-center justify-between gap-2 mt-6">
     <Link
      href="/pricing"
      className="w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-3 rounded-lg hover:opacity-80"
     >
      <Plus className="w-5 h-5" />
      Buy Credits
     </Link>

     {/* COST MODAL */}
     <Dialog>
      <DialogTrigger asChild>
       <button className="w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-3 rounded-lg hover:opacity-80">
        <ChevronsUpDown className="w-5 h-5" />
        Credits Cost
       </button>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-2xl md:w-[65%]">
       <DialogHeader>
        <DialogTitle>Credits Cost</DialogTitle>
        <DialogDescription>Usage breakdown per action</DialogDescription>
       </DialogHeader>

       <div className="flex flex-col gap-6">
        {/* MODIFICATION */}
        <div>
         <h4 className="font-semibold mb-3 border-b pb-2">
          Draft Modification
         </h4>

         <ul className="flex flex-col text-sm divide-y divide-border rounded-lg border overflow-hidden">
          <li className="w-full py-2 px-3 flex justify-between items-center">
           <span className="flex items-center gap-2 text-xs">
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
            Modify / Refine Draft
           </span>

           <strong>{CREDIT_COSTS.modification} credit</strong>
          </li>
         </ul>
        </div>

        {/* TEXT FORMATS */}
        <div>
         <h4 className="font-semibold mb-3 border-b pb-2">
          ✍️ Text-based Formats
         </h4>

         <ul className="flex flex-col text-sm divide-y divide-border rounded-lg border overflow-hidden">
          {TEXT_FORMATS.map(({ icon: Icon, label, key }) => (
           <li
            key={key}
            className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors"
           >
            <span className="flex items-center gap-2 text-xs">
             <Icon className="w-4 h-4 text-muted-foreground" />
             {label}
            </span>

            <strong>
             {
              CREDIT_COSTS.repurpose[key as keyof typeof CREDIT_COSTS.repurpose]
             }{" "}
             credits
            </strong>
           </li>
          ))}
         </ul>
        </div>

        {/* MEDIA */}
        <div>
         <h4 className="font-semibold mb-3 border-b pb-2">🎥 Media Formats</h4>

         <ul className="flex flex-col text-sm divide-y divide-border rounded-lg border overflow-hidden">
          {MEDIA_FORMATS.map(({ icon: Icon, label, key }) => (
           <li
            key={key}
            className="w-full py-2 px-3 flex justify-between items-center hover:bg-muted/50 transition-colors"
           >
            <span className="flex items-center gap-2 text-xs">
             {Icon ? (
              <Icon className="w-4 h-4 text-muted-foreground" />
             ) : (
              <TikTok className="w-4 h-4 text-muted-foreground" />
             )}
             {label}
            </span>

            <strong>
             {CREDIT_COSTS.media[key as keyof typeof CREDIT_COSTS.media]}{" "}
             credits
            </strong>
           </li>
          ))}
         </ul>
        </div>

        <p className="text-sm text-muted-foreground">
         ⚖️ Credit costs are based on complexity and may evolve.
        </p>
       </div>

       <DialogFooter>
        <DialogClose asChild>
         <Button variant="outline">Close</Button>
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
