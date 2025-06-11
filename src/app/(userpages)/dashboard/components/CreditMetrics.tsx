import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ErrorBox } from "@/components/ui/errorbox";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Plus, ChevronsUpDown } from "lucide-react";

import fetchUserCredits from "../lib/fetchUserCredits";

type UserCredits = {
  total_credits: number;
  used_credits: number;
};

const CreditMetrics = async ({ currentUserId }: { currentUserId: string }) => {
  try {
    const userCredits: UserCredits = await fetchUserCredits(currentUserId);
    const { total_credits, used_credits } = userCredits;

    const remaining = total_credits - used_credits;
    const progress =
      total_credits === 0 ? 0 : (used_credits / total_credits) * 100;

    return (
      <div className='w-full h-auto flex flex-col bg-card p-4 border rounded-xl transition-all duration-500 hover:border-primary'>
        <h2 className='font-bold'>Credits Remaining</h2>

        <h3 className='text-4xl font-bold my-4'>{remaining}</h3>

        <p className='mb-2'>
          <strong>{used_credits}</strong> used /<strong>{total_credits}</strong>
          total
        </p>

        <Progress value={progress} />

        <div className='w-full flex items-center justify-between gap-2 mt-6'>
          <Link
            href='/pricing'
            className='w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-3 rounded-lg transition-all duration-500 hover:opacity-80'
          >
            <Plus /> Buy Credits
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <button className='w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-3 rounded-lg transition-all duration-500 hover:opacity-80'>
                <ChevronsUpDown /> Credits Cost
              </button>
            </DialogTrigger>

            <DialogContent className='w-[85%] rounded-2xl md:w-[60%]'>
              <DialogHeader>
                <DialogTitle>Credits Cost</DialogTitle>
                <DialogDescription>
                  Full overview of credit cost per action
                </DialogDescription>
              </DialogHeader>

              <ul className='flex flex-col items-start'>
                <li>
                  Blog → X thread – <strong>2</strong> credits
                </li>
              </ul>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type='button' variant='outline'>
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
    return <ErrorBox message='Failed to load your credits usage' />;
  }
};

export default CreditMetrics;
