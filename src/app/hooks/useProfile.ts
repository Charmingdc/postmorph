"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getProfile from "@/lib/user/client";
import type { Profile } from "@/types";

type UseProfileResult = {
  profile: Profile | null;
  loadingProfile: boolean;
};

const useProfile = (): UseProfileResult => {
  const router = useRouter();
  const pathname = usePathname();

  const query = useQuery<Profile | null>({
    queryKey: ["user-profile"],
    queryFn: getProfile
  });

  useEffect(() => {
    if (query.isSuccess && !query.data && pathname !== "/auth/signin") {
      router.push("/auth/signin");
    }
  }, [query.isSuccess, query.data, pathname, router]);

  return {
    profile: query.data ?? null,
    loadingProfile: query.isLoading
  };
};

export default useProfile;
