"use server";

import { createClient } from "@/utils/supabase/createClient";
import { createAdminClient } from "@/utils/supabase/createAdminClient";
import { deleteAvatarFolder } from "@/utils/supabase/deleteAvatarFolder";
import { redirect } from "next/navigation";

const deleteAccount = async () => {
  const supabase = await createClient();
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;
  // Delete avatar folder from storage
  await deleteAvatarFolder(userId);

  // Delete user from auth (which cascades to DB)
  const admin = createAdminClient();
  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);

  if (deleteError) {
    console.error("Delete error:", deleteError);
    throw new Error("Failed to delete user account.");
  }

  redirect("/auth/signup");
};
