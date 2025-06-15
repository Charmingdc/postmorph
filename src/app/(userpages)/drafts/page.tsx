import { Suspense } from "react";
import { redirect } from "next/navigation";
import getUser from "@/lib/user/server";

import DraftLoader from "@/components/drafts/DraftLoader";
import DraftsList from "./components/DraftsList";

const DraftsPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className='w-full'>
      <Suspense fallback={<DraftLoader />}>
        <DraftsList currentUserId={user.id} />
      </Suspense>
    </main>
  );
};

export default DraftsPage;
