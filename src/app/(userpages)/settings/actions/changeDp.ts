"use server";

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

  const {
    data: { publicUrl }
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  if (!publicUrl) {
    return { type: "error", message: "Failed to get public URL." };
  }

  const { data: profile } = await supabase
    .from("Profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .single();

  if (profile?.avatar_url) {
    const parts = profile.avatar_url.split(
      "/storage/v1/object/public/avatars/"
    );
    const oldPath = parts[1];
    if (oldPath) {
      await supabase.storage.from("avatars").remove([oldPath]);
    }
  }

  const { error: updateError } = await supabase
    .from("Profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return { type: "error", message: "Failed to update profile." };
  }

  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      avatar_url: publicUrl,
      picture: publicUrl
    }
  });

  if (metaError) {
    return {
      type: "error",
      message: "Avatar updated but failed to sync user metadata."
    };
  }

  return { type: "success", message: "Avatar updated successfully!" };
};

export default changeDp;
