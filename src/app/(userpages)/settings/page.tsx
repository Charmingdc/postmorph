import getProfile from "@/lib/user/server";

import UserAvatar from "./components/UserAvatar";

const settingsPage = async () => {
  const profile = await getProfile();

  return (
    <main>
      <h1 className='font-bold text-2xl text-foreground'> Account Settings </h1>
      <p className='text-muted-foreground'> Manage your account settings </p>

      <div className='w-full flex gap-y-4 my-4'>
        <UserAvatar userAvatarUrl={profile.avatar_url} />
      </div>
    </main>
  );
};

export default settingsPage;
