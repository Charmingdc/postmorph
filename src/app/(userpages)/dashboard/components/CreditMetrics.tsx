import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus, ChevronsUpDown } from 'lucide-react';

const CreditMetrics = () => {
  return (
    <div className='w-full h-auto flex flex-col bg-card p-4 border rounded-xl transition-all duration-500 hover:border-primary'>
      <h2 className='font-bold'> Credits Remaining </h2>

      <h3 className='text-4xl font-bold my-4'> 64 </h3>

      <p className='mb-2'>
        <strong> 36 </strong> used / <strong> 100 </strong> total
      </p>

      <Progress value={64} />

      <div className='w-full flex items-center justify-between gap-2 mt-6'>
        <Link
          href=''
          className='w-full flex items-center justify-center bg-primary text-primary-foreground gap-x-2 p-3 rounded-lg transition-all duration-500 hover:opacity-80'>
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
              <DialogTitle> Credits Cost </DialogTitle>
              <DialogDescription>
                Full overview of credits cost per actions
              </DialogDescription>
            </DialogHeader>
            <ul className='flex flex-col items-start'>
              <li> Blog to X thread - 2 credits </li>
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
};

export default CreditMetrics;
