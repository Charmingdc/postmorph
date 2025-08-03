"use server";
import { createClient } from "@/utils/supabase/server";
import type { ActionState } from "@/types/index";

const addNewVoice = async (
  prev: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const supabase = await createClient();
};
export default addNewVoice;
