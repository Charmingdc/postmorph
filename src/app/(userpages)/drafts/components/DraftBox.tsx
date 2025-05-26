import Link from 'next/link';
import { Trash, PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DraftType } from '@/lib/types';

type DrafBoxProps = {
  draft: DraftType;
};

const DraftBox = ({ draft }: DraftBoxProps) => {
  const { type, content } = draft;

  return (
    <div className='w-full flex flex-col gap-2 bg-card text-card-foreground p-4 border rounded-xl transition-all duration-500 hover:border-primary'>
      <div className='w-fit bg-background capitalize py-2 px-4 rounded-lg mb-3'>
        {type}
      </div>

      <p className='line-clamp-5'> {content} </p>

      <div className='w-full flex items-center gap-4 mt-4'>
        <Button variant='destructive'>
          <Trash /> Delete
        </Button>

        <Link
          href={`/edit`}
          className='flex items-center gap-4 p-2 px-4 border border-border rounded-lg transition-all duration-300 hover:bg-card'>
          <PencilLine /> Edit
        </Link>
      </div>
    </div>
  );
};

export default DraftBox;
