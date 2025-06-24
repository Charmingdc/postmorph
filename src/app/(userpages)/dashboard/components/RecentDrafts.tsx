import { cookies } from "next/headers";
import DraftController from "@/components/drafts/DraftController";
import Link from "next/link";

const RecentDrafts = async ({ currentUserId }: { currentUserId: string }) => {
  const cookieStore = await cookies();
  const cookieStr = cookieStore.toString();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const res = await fetch(
    `${baseUrl}/api/drafts?userId=${currentUserId}&from=0&to=2`,
    {
      headers: {
        Cookie: cookieStr
      },
      cache: "no-store"
    }
  );

  const json = await res.json();
  const drafts = json.drafts || [];

  return (
    <div className='w-full my-12'>
      <h3 className='text-2xl font-bold mb-2'> Recent Drafts </h3>
      <DraftController drafts={drafts} />

      <div className='w-full flex items-center justify-center mt-8'>
        <Link href='/drafts'>View all</Link>
      </div>
    </div>
  );
};

export default RecentDrafts;
