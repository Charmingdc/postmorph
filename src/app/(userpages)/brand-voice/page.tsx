import getProfile from "@/lib/user/server";
import type { Profile } from "@/types/index";

import VoiceCountBar from "./components/VoiceCountBar";
import AddVoiceForm from "./components/AddVoiceForm";
import VoiceList from "./components/VoiceList";

const BrandVoicePage = async () => {
  const userProfile: Profile | null = await getProfile();

  return (
    <main className="mb-14">
      <p> Add custom voices that reflects your brand. </p>

      { userProfile && 
        <>
        <VoiceCountBar userId={userProfile.user_id} />
      <AddVoiceForm userId={userProfile.user_id} />
      <VoiceList userId={userProfile.user_id} />
      </>
}
    </main>
  );
};

export default BrandVoicePage;
