"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const getCurrentUserId = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error
  } = await supbase.auth.getUser();

  if (!user) redirect("/auth/signin");
  if (error) {
    throw new Error(error.message);
  }

  return user.id;
};

export default getCurrentUserId;
