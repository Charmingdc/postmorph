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

    // Determine if the target is an X thread
    const isThread = targetPlatform.toLowerCase() === "x thread";

    const prompt = isThread
      ? `Repurpose the following ${sourcePlatform} post into a native ${targetPlatform} using a ${preferredTone} tone:

${content}

Format the result as a series of tweets that make up a thread.
- Separate each tweet ONLY with the delimiter: --tweet break--
- Each tweet must be under 280 characters
- Ensure tweets flow logically
- Use line breaks and spacing natural to ${targetPlatform}`
      : `Repurpose the following ${sourcePlatform} post into a native ${targetPlatform} post using a ${preferredTone} tone:

${content}

Ensure the output aligns with the ${targetPlatform}'s natural writing style and formatting conventions (line breaks, spacing, emojis, hashtags, call-to-actions, etc.).
- If ${targetPlatform} is "tweet", the ENTIRE output must fit within 280 characters.
- Do NOT use --tweet break-- in this case.`;

    console.log("Prompt:", prompt);
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
        "You may need to adapt content into formats like LinkedIn posts, tweets, X threads, Instagram captions, etc. " +
        "Always preserve the original meaning and follow the requested tone. " +
        "Be concise and adapt your style to the target platform’s conventions — tone, emojis, hashtags, call-to-actions, and spacing. " +
        "If the target platform is 'tweet', the ENTIRE response must be under 280 characters and contain NO --tweet break-- delimiter. " +
        "If the target platform is 'x thread', generate multiple tweets under 280 characters each, separated ONLY by the delimiter --tweet break--. " +
        "Format using natural text conventions such as line breaks and paragraphs. " +
        "Do NOT use markdown syntax (no **bold**, ## headings, backticks, etc.). " +
        "Always return ONLY the repurposed content — no commentary or prefaces.",
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

    return NextResponse.json(draft);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return apiError(err.message || "Internal server error", 500);
    }
    return apiError("Unknown server error", 500);
  }
}
