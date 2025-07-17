"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

type Result = { type: "success" | "error"; message: string };

const changeFullname = async (
  prevState: { type: "success"; message: string },
  formData: FormData
): Promise<Result> => {
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

  // Update user fullname in the Profiles table
  const { error: updateError } = await supabase
    .from("Profiles")
    .update({ full_name: fullname })
    .eq("user_id", user.id);

  if (updateError) {
    return { type: "error", message: "Failed to update profile." };
  }

  // Update user metadata in auth
  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      name: fullname,
      full_name: fullname
    }
  });

  if (metaError) {
    return {
      type: "error",
      message: "Fullname updated but failed to sync user metadata."
    };
  }

  // Revalidate settings page
  revalidatePath("/settings", "layout");

  return { type: "success", message: "Fullname updated successfully!" };
};

export default changeFullname;
