"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const deleteDraft = async (formData: FormData) => {
  const draftId = formData.get("draft_id") as string;

  const supabase = await createClient();
  const { error } = await supabase.from("drafts").delete().eq("id", draftId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/editor", "layout");
  redirect("/editor");
};

export default deleteDraft;
