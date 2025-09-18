import type { OutputPlatformType } from "@/types/index";
interface PlatformPrompt {
  template: (
    sourcePlatform: string,
    toneInstruction: string,
    content: string
  ) => string;
}

export const platformGuidelines: Record<OutputPlatformType, PlatformPrompt> = {
  "x thread": {
    template: (sourcePlatform, toneInstruction, content) => `
Repurpose the following ${sourcePlatform} post into a native X thread.

Follow this tone guideline:
${toneInstruction}

${content}

Format the result as a series of tweets that make up a thread:
- Separate each tweet ONLY with the delimiter: --tweet break--
- Each tweet must be under 280 characters
- Ensure tweets flow logically and feel connected
- Ensure tweets contents are well structured with proper line breaks and spacing
- Use line breaks and spacing natural to X`
  },

  tweet: {
    template: (sourcePlatform, toneInstruction, content) => `
Repurpose the following ${sourcePlatform} post into a single tweet.

Follow this tone guideline:
${toneInstruction}

${content}

Requirements:
- The ENTIRE output must fit within 280 characters (very important)
- Do NOT use --tweet break--
- Ensure that the tweet is well structured with proper line breaks and spacing
- Use concise language, emojis, hashtags, or call-to-actions naturally`
  },

  "linkedln post": {
    template: (sourcePlatform, toneInstruction, content) => `
Repurpose the following ${sourcePlatform} post into a native LinkedIn post.

Follow this tone guideline:
${toneInstruction}

${content}

Requirements:
- Professional tone suitable for LinkedIn
- Use line breaks, spacing, and call-to-actions naturally
- Keep it engaging and readable`
  },

  "reddit post": {
    template: (sourcePlatform, toneInstruction, content) => `
Repurpose the following ${sourcePlatform} post into a native Reddit post.

Follow this tone guideline:
${toneInstruction}

${content}

Format requirements:
- Include a compelling title and body
- Keep the post natural and engaging
- Use proper spacing, line breaks, and paragraphs
- Follow typical Reddit conventions`
  }
};
