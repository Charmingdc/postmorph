import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    next = "/dashboard";
  }

  // ✅ NEW APPROACH: Use a single environment variable for your base site URL.
  // This makes it easier to swap between environments (Cloudflare link, staging, prod)
  // without editing this file.
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!siteUrl) {
    console.error("NEXT_PUBLIC_APP_URL is not set in .env");
    return NextResponse.redirect("/error");
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

      // 🔥 NEW redirect logic: Always redirect using the env variable
      return NextResponse.redirect(`${siteUrl}${next}`);

      /*
      🔙 OLD APPROACH: Header & NODE_ENV based redirect logic
      -------------------------------------------------------
      If you'd like to switch back to the old approach, simply
      comment out the line above and uncomment the block below.

      Pros: 
        - Dynamically detects `origin` or `x-forwarded-host`.
      Cons: 
        - In dev, you'll always get localhost:3000 redirects.
        - Requires proxies (like Cloudflare) to set headers correctly.

      const { origin } = new URL(request.url);
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`;

      return NextResponse.redirect(redirectUrl);
      */
    }
  }

  // fallback error page
  return NextResponse.redirect(`${siteUrl}/error`);
}
