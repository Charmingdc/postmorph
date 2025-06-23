"use client";

import DraftController from "@/components/drafts/DraftController";
import DraftLoader from "@/components/drafts/DraftLoader";
import Spinner from "@/components/ui/spinner";

import usePaginatedDrafts from "../hooks/usePaginatedDrafts";

const DraftsList = ({ currentUserId }: { currentUserId: string }) => {
  const { drafts, isInitialLoading, isFetching, isDone, fetchMore } =
    usePaginatedDrafts(currentUserId);

  return (
    <div>
      {isInitialLoading ? (
        <DraftLoader />
      ) : (
        <>
          <DraftController drafts={drafts} />

          {!isDone && (
            <button
              onClick={fetchMore}
              disabled={isFetching}
              className='mt-4 px-4 py-2 bg-black text-white rounded'
            >
              {isFetching ? <Spinner /> : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default DraftsList;
