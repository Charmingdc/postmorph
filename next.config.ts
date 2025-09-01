import type { NextConfig } from "next";

const SUPABASE_HOSTNAME = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!)
  .hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: SUPABASE_HOSTNAME,
        pathname: "/storage/v1/object/public/avatars/**"
      },
      { protocol: "https", hostname: "ui-avatars.com", pathname: "/**" },
      { protocol: "https", hostname: "randomuser.me", pathname: "/**" }
    ]
  }
};

export default nextConfig;
