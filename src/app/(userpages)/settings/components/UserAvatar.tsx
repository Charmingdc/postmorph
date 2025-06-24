"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const UserAvatar = ({ userAvatarUrl }: { userAvatarUrl: string }) => {
  return (
    <div>
      Test, user avatar url is:
      <Image src={userAvatarUrl} height='40' width='50' />
    </div>
  );
};

export default UserAvatar;
