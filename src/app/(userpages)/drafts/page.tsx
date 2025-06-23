import { redirect } from "next/navigation";
import getUser from "@/lib/user/server";

import DraftsList from "./components/DraftsList";

const DraftsPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className='w-full'>
      <DraftsList currentUserId={user.id} />
    </main>
  );
};

export default DraftsPage;
