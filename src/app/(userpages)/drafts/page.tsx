import getProfile from "@/lib/user/server";
import DraftsList from "./components/DraftsList";

const DraftsPage = async () => {
  const profile = await getProfile();

  return (
    <main className="w-full">
      <DraftsList currentUserId={profile.user_id} />
    </main>
  );
};

export default DraftsPage;
