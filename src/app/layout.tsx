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

const siteConfig = {
 name: "Postmorph",
 description: "Transform your contents effortlessly.",
 url: "https://postmorph.vercel.app",
 ogImage: "https://postmorph.vercel.app/opengraph-image.png"
};

export const metadata: Metadata = {
 title: {
  default: siteConfig.name,
  template: `%s | ${siteConfig.name}`
 },
 description: siteConfig.description,
 keywords: [
  "Content Transformation",
  "Multi-format content repurposing",
  "AI content Repurposing",
  "Content Repurposing",
  "Repurposing",
  "Postmorph"
 ],
 authors: [{ name: "Adebayo Muis" }, { name: "Charming Dc" }],
 metadataBase: new URL(siteConfig.url),

 verification: {
  google: "8NzR52XRZ0OtyL8L2hMRRfZAQNn2gzG0lnh8aTN-E10"
 },

 openGraph: {
  type: "website",
  locale: "en_US",
  url: siteConfig.url,
  title: siteConfig.name,
  description: siteConfig.description,
  siteName: siteConfig.name,
  images: [
   {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: siteConfig.name
   }
  ]
 },

 twitter: {
  card: "summary_large_image",
  title: siteConfig.name,
  description: siteConfig.description,
  images: [siteConfig.ogImage],
  creator: "@Charmingdc01"
 },

 icons: {
  icon: "/icon.jpg",
  shortcut: "/icon.jpg",
  apple: "/apple-touch-icon.jpg"
 }
};

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" className={figtree.className}>
   <body className="antialiased">
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
