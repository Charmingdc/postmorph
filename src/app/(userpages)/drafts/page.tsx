import getProfile from "@/lib/user/server";
import type { Profile } from "@/types/index";
import DraftsList from "@/components/drafts/DraftsList";

const DraftsPage = async () => {
  const profile: Profile = await getProfile();

  return (
    <main className="w-full">
      <DraftsList currentUserId={profile.user_id} />
    </main>
  );
};

export default DraftsPage;
