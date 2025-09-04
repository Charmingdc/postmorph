"use server";

import { createClient } from "@/utils/supabase/server";
import type { DraftType } from "@/types/index";

const fetchUniqueDraft = async (
  userId: string,
  draftId: string
): Promise<DraftType> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("drafts")
    .select("*")
    .eq("user_id", userId)
    .eq("id", draftId)
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Unknown error");
  }

  return {
    id: data.id,
    type: data.type,
    modify_count: data.modify_count,
    content: data.content,
    createdAt: data.created_at
  };
};

export default fetchUniqueDraft;
