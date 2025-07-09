import getProfile from "@/lib/user/server";
import type { Profile } from "@/types/index";

import GeneralSetings from "./components/GeneralSettings";

const settingsPage = async () => {
  const profile: Profile = await getProfile();

  return (
    <main>
      <h1 className='font-bold text-2xl text-foreground'> Account Settings </h1>
      <p className='text-muted-foreground'> Manage your account settings </p>

      <h1 className='font-bold text-xl mt-4 mb-2'> • General </h1>
      <GeneralSetings profileDetails={profile} />

      <h1 className='font-bold text-xl mt-4 mb-2'> • Security </h1>
    </main>
  );
};

export default settingsPage;
