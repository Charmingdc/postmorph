import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createClient } from "@/utils/supabase/server";
import { apiError } from "@/lib/apiError";
import fetchUserCredits from "@/lib/fetchUserCredits";

const CREDIT_COST = 4;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sourcePlatform, targetPlatform, content, preferredTone } = body;

    if (!sourcePlatform || !targetPlatform || !content || !preferredTone) {
      return apiError("Incomplete request body", 400);
    }

    // Determine prompt style for threads
    const isThread = targetPlatform.toLowerCase() === "x thread";

    const prompt = isThread
      ? `Repurpose the following ${sourcePlatform} post into a native ${targetPlatform} using a ${preferredTone} tone:

${content}

Format the result as a series of tweets that make up a thread. Separate each tweet with the delimiter: --tweet break--.

Each tweet must:
- Be under 280 characters.
- Flow logically from one to the next.
- Follow the tone and formatting typical for ${targetPlatform} (like emoji frequency and line breaks).`
      : `Repurpose the following ${sourcePlatform} post into a native ${targetPlatform} post using a ${preferredTone} tone:

${content}

Ensure the output aligns with the ${targetPlatform}'s natural writing style.`;

    const supabase = await createClient();

    // Authenticate user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return apiError(userError?.message || "User authentication failed", 401);
    }

    // ✅ Fetch user credits using the working helper
    const { used_credits, total_credits, is_unlimited } =
      await fetchUserCredits(user.id);

    const remainingCredits = total_credits - used_credits;

    console.log({
      used_credits,
      total_credits,
      remainingCredits,
      CREDIT_COST,
      is_unlimited
    });

    if (!is_unlimited && CREDIT_COST > remainingCredits) {
      return apiError(
        "You don't have enough credits to repurpose this content",
        403
      );
    }

    // Generate content using AI
    const result = await generateText({
      model: google("gemini-2.0-flash-lite"),
      system:
        "You are a content repurposing expert who transforms content based on user instructions. " +
        "Tasks may include converting a blog article into a LinkedIn post, X thread, Instagram Reel caption, and more. " +
        "Always preserve the original meaning and respect the existing tone and structure unless explicitly told otherwise. " +
        "Be concise and purposeful in your edits. " +
        "Adapt your output to match the conventions of the target platform — this includes tone, common line break usage, emojis, hashtags, and call-to-action styles. " +
        "If the target platform is 'tweet', ensure the entire response is within 280 characters. " +
        "If the target platform is 'x thread', output a series of tweets separated by --tweet break--, each under 280 characters. " +
        "Format your response with proper spacing, paragraphs, and line breaks where appropriate, but avoid using markdown syntax such as **, ##, etc. " +
        "Always return only the modified content — do not include any introductory phrases like 'Here is your output.'",
      prompt
    });

    if (!result.text) {
      return apiError("No text was generated", 500);
    }

    // Update credits if not unlimited
    if (!is_unlimited) {
      const { error: updateError } = await supabase
        .from("Profiles")
        .update({ used_credits: used_credits + CREDIT_COST })
        .eq("user_id", user.id);

      if (updateError) {
        return apiError("Failed to update user credits", 500);
      }
    }

    // Save generated content as a draft
    const { data: draft, error: draftError } = await supabase
      .from("drafts")
      .insert({
        user_id: user.id,
        type: targetPlatform,
        modify_count: 0,
        content: result.text
      })
      .select("*")
      .single();

    if (draftError) {
      return apiError("Failed to save generated content as draft", 500);
    }

    return NextResponse.json({ draft });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return apiError(err.message || "Internal server error", 500);
    }
    return apiError("Unknown server error", 500);
  }
}
