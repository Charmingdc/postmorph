"use server";

import { createClient } from "@/utils/supabase/server";
import type { CustomVoice } from "@/types/index";

const fetchUserCustomVoices = async (
  userId: string
): Promise<CustomVoice[]> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("custom_voices")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      throw new Error(error?.message || "Failed to fetch user custom voices");
    }

    return data.map(
      ({ id, user_id, name, description, instruction, created_at }) => ({
        id,
        user_id,
        name,
        description,
        instruction,
        createdAt: created_at
      })
    );
  } catch (err: unknown) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "Unknown error fetching custom voices"
    );
  }
};

export default fetchUserCustomVoices;
