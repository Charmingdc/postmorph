import getUser from "@/lib/user/server";

import CreditMetrics from "./components/CreditMetrics";
import RecentDrafts from "./components/RecentDrafts";
import DraftLoader from "@/components/drafts/DraftLoader";
import { Suspense } from "react";

const Dashboard = async () => {
  const user = await getUser();

  return (
    <main className='w-full flex flex-col items-center'>
      <CreditMetrics currentUserId={user.userId} />

      <Suspense fallback={<DraftLoader />}>
        <RecentDrafts currentUserId={user.userId} />
      </Suspense>
    </main>
  );
};

export default Dashboard;
