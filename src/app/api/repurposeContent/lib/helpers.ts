import isUrl from "@/lib/isUrl";
import fetchBlogContent from "./fetchBlog";

const prepareContent = async (sourcePlatform: string, content: string) => {
  if (sourcePlatform.toLowerCase() !== "blog") return content;

  if (isUrl(content)) {
    const blogData = await fetchBlogContent(content);
    return `Title: ${blogData.title}\n\nBody: ${blogData.content}`;
  }

  return content;
};

const buildPrompt = (
  sourcePlatform: string,
  targetPlatform: string,
  toneInstruction: string,
  content: string
) => {
  const isThread = targetPlatform.toLowerCase() === "x thread";

  if (isThread) {
    return `Repurpose the following ${sourcePlatform} post into a native ${targetPlatform}.

Follow this tone guideline:
${toneInstruction}

${content}

Format the result as a series of tweets that make up a thread:
- Separate each tweet ONLY with the delimiter: --tweet break--
- Each tweet must be under 280 characters
- Ensure tweets flow logically and feel connected
- Use line breaks and spacing natural to ${targetPlatform}`;
  }

  return `Repurpose the following ${sourcePlatform} post into a native ${targetPlatform}.

Follow this tone guideline:
${toneInstruction}

${content}

Ensure the output aligns with the ${targetPlatform}'s natural writing style and formatting conventions (line breaks, spacing, emojis, hashtags, call-to-actions, etc.).
- If ${targetPlatform} is "tweet", the ENTIRE output must fit within 280 characters.
- Do NOT use --tweet break-- in this case.`;
};

export { prepareContent, buildPrompt };
