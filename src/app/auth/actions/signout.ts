import { createClient } from "@/utils/supabase/client";

const signout = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error.message);
    throw error;
  }
};

export default signout;
