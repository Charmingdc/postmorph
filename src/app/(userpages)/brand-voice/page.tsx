import getProfile from "@/lib/user/server";
import type { Profile } from "@/types/index";

import VoiceCountBar from "./components/VoiceCountBar";
import AddVoiceForm from "./components/AddVoiceForm";
import VoiceList from "./components/VoiceList";

const BrandVoicePage = async () => {
  const userProfile: Profile = await getProfile();

  return (
    <main className="mb-14">
      <p> Add custom voices that reflects your brand. </p>

      <VoiceCountBar userId={userProfile.user_id} />
      <AddVoiceForm />
      <VoiceList />
    </main>
  );
};

export default BrandVoicePage;
