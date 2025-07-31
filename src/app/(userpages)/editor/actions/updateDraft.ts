"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import type { ActionState } from "@/types/index";

const updateDraft = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const user_id = formData.get("user_id") as string;
  const draft_id = formData.get("draft_id") as string;
  const new_content = formData.get("new_content") as string;

  if (!user_id || !draft_id) {
    return {
      type: "error",
      message: "Incomplete function params"
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("drafts")
    .update({ content: new_content })
    .eq("user_id", user_id)
    .eq("id", draft_id);

  if (error) {
    return {
      type: "error",
      message: error.message || "Error updating draft"
    };
  }

  redirect("/editor");
};

export default updateDraft;
