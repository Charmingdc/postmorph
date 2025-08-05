"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { ActionState } from "@/types/index";

const deleteVoice = async (
  prev: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const voiceId = formData.get("voice_id") as string;

  if (!voiceId) {
    console.error("From delete voice function: Voice Id is undefined");
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("custom_voices")
    .delete()
    .eq("id", voiceId);

  if (error) return { type: "error", message: error.message };

  revalidatePath("/brand_voice", "layout");
  return { type: "success", message: "Selected Voice deleted" };
};

export default deleteVoice;
