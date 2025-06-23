"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

const deleteDraft = async (draftId: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from("drafts").delete().eq("id", draftId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard", "layout");
};

export default deleteDraft;
