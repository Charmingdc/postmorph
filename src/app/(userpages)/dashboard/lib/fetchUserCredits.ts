"use server";

import { createClient } from "@/utils/supabase/server";

const fetchUserCredits = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("total_credits, used_credits")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    throw new Error("Unable to fetch user credit details");
  }

  return data;
};

export default fetchUserCredits;
