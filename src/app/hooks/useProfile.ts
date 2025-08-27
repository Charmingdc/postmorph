"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getProfile from "@/lib/user/client";
import type { Profile } from "@/types";

const useProfile = (): Profile | null => {
  const router = useRouter();

  const { data: profile, isLoading } = useQuery<Profile | null>({
    queryKey: ["user-profile"],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5
  });

  useEffect(() => {
    if (!isLoading && !profile && router.pathname !== "/auth/signin") {
      router.push("/auth/signin");
    }
  }, [isLoading, profile, router]);

  console.log("Profile hook value:", profile);
  return profile ?? null;
};

export default useProfile;
