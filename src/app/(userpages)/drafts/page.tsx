import getProfile from "@/lib/user/server";
import type { Profile } from "@/types/index";
import DraftsList from "@/components/drafts/DraftsList";

const DraftsPage = async () => {
  const profile: Profile | null = await getProfile();

  return (
    <main className="w-full mb-24">
      {profile && <DraftsList currentUserId={profile.user_id} />}
    </main>
  );
};

export default DraftsPage;
