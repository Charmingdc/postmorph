import Link from "next/link";
import { Trash, PencilLine } from "lucide-react";

import DraftBox from "@/components/drafts/DraftBox";
import NoDataCard from "@/components/ui/no-data-card";

import fetchUserDrafts from "../lib/fetchUserDrafts";
import type { DraftType } from "@/lib/types";

const RecentDrafts = async ({ currentUserId }: { currentUserId: string }) => {
  const drafts: DraftType[] = await fetchUserDrafts(currentUserId);

  return (
    <div className='my-12'>
      <h3 className='text-2xl font-bold mb-2'> Recent Drafts </h3>

      <div className='w-full h-auto flex flex-col gap-y-4'>
        {drafts.length > 0 ? (
          <>
            {drafts.map(draft => (
              <DraftBox key={draft.id} draft={draft} />
            ))}

            <Link
              href='/drafts'
              className='w-full flex items-center justify-center text-ring mt-2'
            >
              View all
            </Link>
          </>
        ) : (
          <NoDataCard
            title='No drafts saved'
            message={`You don't have any currently saved draft`}
          />
        )}
      </div>
    </div>
  );
};

export default RecentDrafts;
