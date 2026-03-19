import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
 let supabaseResponse = NextResponse.next({ request });

 const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
   cookies: {
    getAll: () => request.cookies.getAll(),
    setAll(cookiesToSet) {
     cookiesToSet.forEach(({ name, value }) => {
      request.cookies.set(name, value);
     });

     supabaseResponse = NextResponse.next({ request });

     cookiesToSet.forEach(({ name, value, options }) => {
      supabaseResponse.cookies.set(name, value, options);
     });
    }
   }
  }
 );

 const {
  data: { user }
 } = await supabase.auth.getUser();

 const path = request.nextUrl.pathname;

 const isAuthRoute = path.startsWith("/auth");
 const isLegalRoute = path.startsWith("/legal");
 const isBlogRoute = path.startsWith("/blog");
 const isLandingPage = path === "/";

 const isConfirmRoute = path === "/auth/confirm";

 const isEcapedRoutes =
  !isAuthRoute && !isLegalRoute && !isBlogRoute && !isLandingPage;

 // Redirect unauthenticated users away from protected routes
 if (!user && isEcapedRoutes) {
  return redirectTo(request, "/auth/signin");
 }

 // Redirect authenticated users away from auth routes (except confirm)
 if (user && isAuthRoute && !isConfirmRoute) {
  return redirectTo(request, "/dashboard");
 }

 return supabaseResponse;
}

function redirectTo(request: NextRequest, pathname: string) {
 const url = request.nextUrl.clone();
 url.pathname = pathname;
 return NextResponse.redirect(url);
}
