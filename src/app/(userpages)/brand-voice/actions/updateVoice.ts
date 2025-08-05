"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { ActionState } from "@/types/index";

const updateVoice = async (
  prev: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const voiceId = formData.get("voice_id") as string;
  const name = formData.get("voice_name") as string;
  const description = formData.get("voice_description") as string;
  const instruction = formData.get("voice_instruction") as string;

  if (!voiceId) {
    console.error("From update voice function: Voice Id is undefined");
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("custom_voices")
    .update({ name, description, instruction })
    .eq("id", voiceId);

  if (error) return { type: "error", message: error.message };

  revalidatePath("/brand_voice", "layout");
  return { type: "success", message: "Voice details updated!" };
};

export default updateVoice;
