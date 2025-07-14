import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  // Missing token or type — redirect to error page
  if (!token_hash || !type) {
    redirect("/error");
  }

  const supabase = await createClient();

  // Verify the token
  const { error: verifyError } = await supabase.auth.verifyOtp({
    type,
    token_hash
  });

  if (verifyError) {
    console.error("OTP verify error:", verifyError);
    redirect("/error");
  }

  // Fetch the full user with metadata
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect("/error");
  }

  // Check if profile already exists
  const { data: existingProfile, error: profileError } = await supabase
    .from("Profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  if (profileError && profileError.code !== "PGRST116") {

    redirect("/error");
  }

  // Insert profile if not already present
  if (!existingProfile) {
    const { error: insertError } = await supabase.from("Profiles").insert({
      user_id: user.id,
      email: user.email,
      full_name: user.user_metadata?.name || user.user_metadata?.full_name,
      avatar_url: user.user_metadata?.avatar_url || null
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      redirect("/error");
    }
  }

  // All good, redirect to intended destination
  redirect(next);
}
