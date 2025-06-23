import Link from "next/link";
import DraftController from "@/components/drafts/DraftController";
import fetchUserDrafts from "@/lib/drafts/fetchUserDrafts";

const RecentDrafts = async ({ currentUserId }: { currentUserId: string }) => {
  const drafts = await fetchUserDrafts(currentUserId, 3);

  return (
    <div className='w-full my-12'>
      <h3 className='text-2xl font-bold mb-2'>Recent Drafts</h3>
      <DraftController drafts={drafts} />

      <div className='w-full flex items-center justify-center mt-8'>
        <Link href='/drafts'> View all </Link>
      </div>
    </div>
  );
};

export default RecentDrafts;
