import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const fetchBlogContent = async (url: string) => {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch blog: ${res.statusText}`);

    const html = await res.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent)
      throw new Error("No readable blog content found");

    return {
      title: article.title || "Untitled",
      content: article.textContent,
      htmlContent: article.content || ""
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("🚨 Error scraping blog:", err);
      throw err;
    } else {
      console.error("An unknown error occurred when scraping blog");
      throw new Error("Unknown scraping error");
    }
  }
};

export default fetchBlogContent;
