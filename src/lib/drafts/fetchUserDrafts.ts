"use server";

import { createClient } from "@/utils/supabase/server";
import type { DraftType } from "@/lib/types";

const fetchUserDrafts = async (
  userId: string,
  limit: number | null = null
): Promise<DraftType[]> => {
  const supabase = await createClient();

  let query = supabase
    .from("drafts")
    .select("*")
    .eq("user_id", userId);

  if (limit !== null) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !data) {
    throw new Error(error.message);
  }

  return data.map(draft => ({
    id: draft.id,
    type: draft.type,
    content: draft.content,
    createdAt: draft.created_at,
  }));
};

export default fetchUserDrafts;