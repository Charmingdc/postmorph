import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const figtree = Figtree({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Postmorph",
  description: "Transform your contents effortlessly"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.className}>
      <body>
        {children}

        <Analytics />
        <SpeedInsights />
        <Toaster
          theme="system"
          position="top-center"
          visibleToasts={3}
          closeButton={true}
        />
      </body>
    </html>
  );
}
