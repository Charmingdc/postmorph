"use server";

import { createClient } from "@/utils/supabase/server";
import type { CreditInfo } from "@/types/index";

const fetchUserCredits = async (userId: string): Promise<CreditInfo> => {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("Profiles")
    .select("is_unlimited, total_credits, used_credits")
    .eq("user_id", userId)
    .single();

  if (error || !profile) {
    throw new Error(error?.message || "Unable to fetch user credits.");
  }

  const { is_unlimited = false, total_credits = 0, used_credits = 0 } = profile;

  return {
    is_unlimited,
    total_credits,
    used_credits
  };
};

export default fetchUserCredits;
