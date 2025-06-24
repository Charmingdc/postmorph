import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const getUser = async () => {
  const supabase = await createClient();

  const {
    data: { authenticatedUser }
  } = await supabase.auth.getUser();

  if (authenticatedUser) {
    const {
      data: { user },
      error: { userError }
    } = await supabase.from("Profiles").select("*").eq("userId", user.id);
  } else if (!authenticatedUser) {
    redirect("/auth/signin");
  }

  return user;
};

export default getUser;
