"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const getCurrentUserId = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!user) redirect("/auth/signin");

  return user.id;
};

export default getCurrentUserId;
