import { redirect } from "next/navigation";
import getUser from "@/lib/user/server";

import CreditMetrics from "./components/CreditMetrics";
import RecentDrafts from "./components/RecentDrafts";
import DraftLoader from "@/components/drafts/DraftLoader";
import { Suspense } from "react";

const Dashboard = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className='w-full flex flex-col items-center'>
      <CreditMetrics currentUserId={user.id} />

      <Suspense fallback={<DraftLoader />}>
        <RecentDrafts currentUserId={user.id} />
      </Suspense>
    </main>
  );
};

export default Dashboard;
