import getProfile from "@/lib/user/server";

import CreditMetrics from "./components/CreditMetrics";
import RecentDrafts from "./components/RecentDrafts";
import DraftLoader from "@/components/drafts/DraftLoader";
import { Suspense } from "react";

const Dashboard = async () => {
  const profile = await getProfile();
  if (profile) {
    const userId = profile.user_id;
  }

  return (
    <main className="w-full flex flex-col items-center">
      <CreditMetrics currentUserId={userId} />

      <Suspense fallback={<DraftLoader />}>
        <RecentDrafts currentUserId={userId} />
      </Suspense>
    </main>
  );
};

export default Dashboard;
