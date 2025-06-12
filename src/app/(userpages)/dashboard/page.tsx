import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import CreditMetrics from "./components/CreditMetrics";
import RecentDrafts from "./components/RecentDrafts";

const Dashboard = async () => {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // Redirect to login if no user
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className='w-full flex flex-col items-center'>
      <CreditMetrics currentUserId={user.id} />
      <RecentDrafts />
    </main>
  );
};

export default Dashboard;
