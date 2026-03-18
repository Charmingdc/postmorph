import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
 return [
  {
   url: "https://postmorph.vercel.app",
   lastModified: new Date(),
   changeFrequency: "monthly",
   priority: 1
  },
  {
   url: "https://postmorph.vercel.app/legal/privacy",
   lastModified: new Date(),
   changeFrequency: "monthly",
   priority: 0.3
  },
  {
   url: "https://postmorph.vercel.app/legal/terms",
   lastModified: new Date(),
   changeFrequency: "monthly",
   priority: 0.3
  }
 ];
}
