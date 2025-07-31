"use server";

import { createClient } from "@/utils/supabase/server";
import type { DraftType } from "@/lib/types";

const fetchUniqueDraft = async (
  userId: string,
  draftId: string
): Promise<DraftType> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("drafts")
    .select("*")
    .eq("user_id", userId)
    .eq("id", draftId);

  if (error || !data) {
    throw new Error(error.message);
  }

  return data.map(draft => ({
    id: draft.id,
    type: draft.type,
    content: draft.content,
    createdAt: draft.created_at
  }));
};

export default fetchUniqueDraft;
