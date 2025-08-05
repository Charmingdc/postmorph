"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { ActionState } from "@/types/index";

const changeEmail = async (
  prevState: { type: "success"; message: string },
  formData: FormData
): Promise<ActionState> => {
  const newEmail = formData.get("email") as string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(newEmail);
  if (!newEmail || !isValidEmail) {
    return {
      type: "error",
      message: "Invalid email provided"
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { type: "error", message: "You must be logged in." };
  }

  const { error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) {
    return {
      type: "error",
      message: error.message || "Failed to update email."
    };
  }

  revalidatePath("/settings", "layout");
  return {
    type: "success",
    message:
      "Email update initiated. Please confirm via the email link to complete the  process."
  };
};

export default changeEmail;
