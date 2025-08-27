import { createClient } from "@/utils/supabase/client";
import type { Profile } from "@/types";

const getProfile = async (): Promise<Profile | null> => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  return profile;
};

export default getProfile;
