"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { ActionState } from "@/types/index";

const changeFullname = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const fullname = formData.get("fullname") as string;

  // Check if name is provided
  if (!fullname) {
    return { type: "error", message: "Name input cannot be blank" };
  }

  const supabase = await createClient();

  // Get the current logged-in user
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { type: "error", message: "You must be logged in." };
  }

  // Update user metadata
  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      name: fullname,
      full_name: fullname
    }
  });

  if (metaError) {
    return {
      type: "error",
      message: "Failed to update full name"
    };
  }

  // Revalidate settings page
  revalidatePath("/settings", "layout");
  return { type: "success", message: "Fullname updated successfully!" };
};

export default changeFullname;
