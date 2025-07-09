"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/user/client";
import type { Profile } from "@/app/types/index";

const useProfile = () => {
  const router = useRouter();

  return useQuery<Profile | null>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const profile = await getProfileClient();
      if (!profile) {
        router.push("/auth/signin");
        return null;
      }
      return profile;
    },
    staleTime: 1000 * 60 * 5,
    retry: false
  });
};

export default useProfile;
