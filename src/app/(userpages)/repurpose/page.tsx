import getProfile from "@/lib/user/server";
import RepurposeForm from "./components/RepurposeForm";
import type { Profile } from "@/types/index";

const RepurposePage = async () => {
  const userProfile: Profile = await getProfile();

  return (
    <main className="w-full">
      {userProfile && <RepurposeForm userId={userProfile.user_id} />}
    </main>
  );
};

export default RepurposePage;
