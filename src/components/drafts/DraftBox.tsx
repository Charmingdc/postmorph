"use client";

import { use } from "react";
import Link from "next/link";
import { Trash, PencilLine } from "lucide-react";

import NoDataCard from "@/components/ui/no-data-card";
import { Button } from "@/components/ui/button";
import type { DraftType } from "@/lib/types";

type DraftBoxProps = {
  drafts: Promise<DraftType[]>;
};

const DraftBox = ({ drafts }: DraftBoxProps) => {
  const allDrafts = use(drafts);

  if (!allDrafts || allDrafts.length === 0) {
    return (
      <NoDataCard
        title='No Drafts'
        message={`You don't have any drafts saved.`}
      />
    );
  }

  return (
    <>
      {allDrafts.map(draft => (
        <div
          key={draft.id}
          className='w-full flex flex-col gap-2 bg-card text-card-foreground p-4 border rounded-xl transition-all duration-500 hover:border-primary'
        >
          <div className='w-fit bg-background text-sm capitalize py-2 px-4 rounded-lg mb-3'>
            {draft.type}
          </div>

          <div className='prose prose-sm text-sm whitespace-pre-wrap line-clamp-8'>
            {draft.content}
          </div>

          <div className='w-full flex items-center gap-4 mt-4'>
            <Button variant='destructive'>
              <Trash /> Delete
            </Button>

            <Link
              href={`/edit`}
              className='flex items-center gap-4 p-2 px-4 border border-border rounded-lg transition-all duration-300 hover:bg-card'
            >
              <PencilLine /> Edit
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default DraftBox;
