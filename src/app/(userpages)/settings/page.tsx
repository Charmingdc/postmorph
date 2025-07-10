import getProfile from "@/lib/user/server";
import type { Profile } from "@/types/index";

import GeneralSetings from "./components/GeneralSettings";
import SecuritySettings from "./components/SecuritySettings";
import DangerZone from "./components/DangerZone";

const settingsPage = async () => {
  const profile: Profile = await getProfile();

  return (
    <main>
      <h1 className='font-bold text-2xl text-foreground'> Account Settings </h1>
      <p className='text-muted-foreground'> Manage your account settings </p>

      <h1 className='font-bold text-xl mt-4 mb-2'> • General </h1>
      <GeneralSetings profileDetails={profile} />

      <h1 className='font-bold text-xl mt-4 mb-2'> • Security </h1>
      <SecuritySettings userId={profile.user_id} />

      <h1 className='font-bold text-red-400 text-xl mt-4 mb-2'>
        • Danger Zone
      </h1>
      <DangerZone userId={profile.user_id} />
    </main>
  );
};

export default settingsPage;
