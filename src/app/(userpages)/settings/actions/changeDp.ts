"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

type Result = { type: "success" | "error"; message: string };

const changeDp = async (formData: FormData): Promise<Result> => {
  const filePath = formData.get("filePath") as string;
  if (!filePath) {
    return { type: "error", message: "No file path provided." };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { type: "error", message: "You must be logged in." };
  }

  // Get the public URL
  const {
    data: { publicUrl }
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  if (!publicUrl) {
    return { type: "error", message: "Failed to get public URL." };
  }

  // Remove old avatar if any
  const { data: profile, error: profileFetchError } = await supabase
    .from("Profiles")
    .select("avatar_url")
    .eq("user_id", user.id)
    .single();

  if (profileFetchError) {
    return { type: "error", message: "failed to fetch profile" };
  }

  if (profile?.avatar_url) {
    const parts = profile.avatar_url.split(
      "/storage/v1/object/public/avatars/"
    );
    const oldPath = parts[1];
    if (oldPath) {
      await supabase.storage.from("avatars").remove([oldPath]);
    }
  }

  // Update user avatar metadata in auth
  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      avatar_url: publicUrl,
      picture: publicUrl
    }
  });

  if (metaError) {
    return {
      type: "error",
      message: "Failed to update avatar."
    };
  }

  // Revalidate settings page
  revalidatePath("/settings", "layout");
  return { type: "success", message: "Avatar updated successfully!" };
};

export default changeDp;
