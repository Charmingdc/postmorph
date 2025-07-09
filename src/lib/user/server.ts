import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const getProfile = async () => {
  const supabase = await createClient();

  const {
    data: { user: authenticatedUser }
  } = await supabase.auth.getUser();

  if (!authenticatedUser) {
    redirect("/auth/signin");
  }

  const { data: profile, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("user_id", authenticatedUser.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }

  return profile;
};

export default getProfile;
