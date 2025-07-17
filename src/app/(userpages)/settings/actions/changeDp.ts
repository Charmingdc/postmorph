"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

type Result = { type: "success" | "error"; message: string };

const changeDp = async (formData: FormData): Promise<Result> => {
  const filePath = formData.get("filePath") as string;
  if (!filePath) {
    console.error("[changeDp] ❌ No file path provided");
    return { type: "error", message: "No file path provided." };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("[changeDp] ❌ Auth error:", authError?.message);
    return { type: "error", message: "You must be logged in." };
  }

  console.log("[changeDp] 👤 Authenticated user ID:", user.id);
  console.log("[changeDp] 📁 File path:", filePath);

  // Get the public URL
  const {
    data: { publicUrl }
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  if (!publicUrl) {
    console.error("[changeDp] ❌ Failed to get public URL for:", filePath);
    return { type: "error", message: "Failed to get public URL." };
  }

  console.log("[changeDp] 🌐 Public URL:", publicUrl);

  // Remove old avatar if any
  const { data: profile, error: profileFetchError } = await supabase
    .from("Profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .single();

  if (profileFetchError) {
    console.error(
      "[changeDp] ❌ Failed to fetch profile:",
      profileFetchError.message
    );
  }

  if (profile?.avatar_url) {
    const parts = profile.avatar_url.split(
      "/storage/v1/object/public/avatars/"
    );
    const oldPath = parts[1];
    if (oldPath) {
      const { error: removeError } = await supabase.storage
        .from("avatars")
        .remove([oldPath]);
      if (removeError) {
        console.warn("[changeDp] ⚠️ Failed to remove old avatar:", oldPath);
      } else {
        console.log("[changeDp] 🗑️ Old avatar removed:", oldPath);
      }
    }
  }

  // Update the profile with new avatar_url
  const { error: updateError } = await supabase
    .from("Profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    console.error(
      "[changeDp] ❌ Failed to update profile:",
      updateError.message
    );
    return { type: "error", message: "Failed to update profile." };
  }

  console.log("[changeDp] ✅ Profile avatar_url updated");

  // Update user metadata in auth
  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      avatar_url: publicUrl,
      picture: publicUrl
    }
  });

  if (metaError) {
    console.warn(
      "[changeDp] ⚠️ Avatar updated, but metadata sync failed:",
      metaError.message
    );
    return {
      type: "error",
      message: "Avatar updated but failed to sync user metadata."
    };
  }

  console.log("[changeDp] 🔄 User metadata updated");

  // Revalidate settings page
  revalidatePath("/settings", "layout");
  console.log("[changeDp] ✅ Path revalidated: /settings");

  return { type: "success", message: "Avatar updated successfully!" };
};

export default changeDp;
