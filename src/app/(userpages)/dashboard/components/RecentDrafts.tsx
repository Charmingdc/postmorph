import { Suspense } from "react";

import DraftLoader from "@/components/drafts/DraftLoader";
import DraftBox from "@/components/drafts/DraftBox";
import fetchUserDrafts from "../lib/fetchUserDrafts";

const RecentDrafts = ({ currentUserId }: { currentUserId: string }) => {
  const draftsPromise = fetchUserDrafts(currentUserId);

  return (
    <div className='my-12'>
      <h3 className='text-2xl font-bold mb-2'>Recent Drafts</h3>

      <div className='w-full h-auto flex flex-col gap-y-4'>
        <Suspense fallback={<DraftLoader />}>
          <DraftBox drafts={draftsPromise} />
        </Suspense>
      </div>
    </div>
  );
};

export default RecentDrafts;
