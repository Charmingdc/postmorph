"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import type { ActionState } from "@/types/index";

const addNewVoice = async (
  prev: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const userId = formData.get("user_id") as string;
  const name = formData.get("voice_name") as string;
  const description = formData.get("voice_description") as string;
  const instruction = formData.get("voice_instruction") as string;

  if (!userId)
    return {
      type: "error",
      message:
        "Unauthorized operation, you must be signed in to add a new custom voice"
    };

  if (!name || !description || !instruction)
    return {
      type: "error",
      message: "Incomplete form data, required fields are missing"
    };

  const supabase = await createClient();
  const { data: userVoices, error: userVoicesErr } = await supabase
    .from("custom_voices")
    .select("id")
    .eq("user_id", userId);

  if (userVoicesErr) {
    return { type: "error", message: userVoicesErr.message };
  } else if (userVoices.length >= 3) {
    return { type: "error", message: "Custom voices creation limit exceeded" };
  }

  const { error } = await supabase.from("custom_voices").insert({
    user_id: userId,
    name,
    description,
    instruction
  });

  if (error) return { type: "error", message: error.message };

  revalidatePath("/brand_voice", "layout");

  return { type: "success", message: `${name} voice added successfully!` };
};

export default addNewVoice;
