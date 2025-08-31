import isUrl from "@/lib/isUrl";
import fetchBlogContent from "./fetchBlog";
import { getTranscript } from "./getTranscript";

const prepareContent = async (
  sourcePlatform: string,
  content: string
): Promise<string> => {
  try {
    const platform = sourcePlatform.toLowerCase();

    // Blog handling
    if (platform === "blog" && isUrl(content)) {
      const blogData = await fetchBlogContent(content);
      return `Title: ${blogData.title}\n\nBody: ${blogData.content}`;
    }

    // Video handling
    if (
      (platform === "youtube video" || platform === "tiktok video") &&
      isUrl(content)
    ) {
      const transcript = await getTranscript(content);
      if (!transcript) {
        throw new Error("Couldn’t extract transcript for this video.");
      }
      return transcript;
    }

    // Default: return raw content
    return content;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to prepare content.");
    }
    throw new Error("Unknown error occurred while preparing content.");
  }
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
