import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    next = "/dashboard";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        const { data: existingProfile } = await supabase
          .from("Profiles")
          .select("user_id")
          .eq("user_id", user.id)
          .single();

        if (!existingProfile) {
          await supabase.from("Profiles").insert({
            user_id: user.id,
            email: user.email,
            full_name: user.user_metadata.full_name ?? "New User",
            avatar_url:
              user.user_metadata?.avatar_url || user.user_metadata?.picture
          });
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`;

      return NextResponse.redirect(redirectUrl);
    }
  }

  // fallback error page
  return NextResponse.redirect(`${origin}/error`);
}
