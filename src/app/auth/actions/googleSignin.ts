"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const googleSignin = async (): Promise<{ message: string }> => {
  const supabase = await createClient();

  // Get the current host from the request headers
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${domain}/auth/callback`
    }
  });

  if (error) {
    return { message: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }

  return { message: "Signed in successfully" };
};

export default googleSignin;
