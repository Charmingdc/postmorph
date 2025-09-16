"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { ActionState } from "@/types/index.ts";

const updatePassword = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword) {
    return { type: "error", message: "Both fields are required." };
  } else if (currentPassword === newPassword) {
    return {
      type: "error",
      message: "New password can't be the same thing as current password"
    };
  }

  const supabase = await createClient();

  // Get the current session
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user?.email) {
    return { type: "error", message: "Not authenticated." };
  }

  const email = session.user.email;
  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword
  });

  if (reauthError) {
    return { type: "error", message: "Current password is incorrect." };
  }

  // Update to new password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (updateError) {
    return { type: "error", message: "Failed to update password." };
  }

  revalidatePath("/settings", "layout");
  return { type: "success", message: "Password updated successfully." };
};

export default updatePassword;
