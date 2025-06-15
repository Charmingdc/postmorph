"use server";

import { createClient } from "@/utils/supabase/server";

const fetchUserCredits = async (userId: string): Promise<{total_credits: number,
used_credits: number}> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Profiles")
    .select("total_credits, used_credits")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    throw new Error(error.message);
  }

  return data;
};

export default fetchUserCredits;
