import isUrl from "@/app/utils/isUrl";
import fetchBlogContent from "./fetchBlog";
import { getTranscript } from "./getTranscript";
import { platformGuidelines } from "./platform-guidelines";

import type { OutputPlatformType } from "@/types/index";

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

    // return raw content
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
  targetPlatform: OutputPlatformType,
  toneInstruction: string,
  content: string
) => {
  const platform = platformGuidelines[targetPlatform];

  if (!platform) {
    return `
Repurpose the following ${sourcePlatform} post into a native ${targetPlatform}.

Follow this tone guideline:
${toneInstruction}

${content}

Ensure the output aligns with ${targetPlatform}'s natural writing style and formatting conventions.`;
  }

  return platform.template(sourcePlatform, toneInstruction, content);
};

export { prepareContent, buildPrompt };
