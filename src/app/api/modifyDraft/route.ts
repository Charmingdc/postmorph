import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createClient } from "@/utils/supabase/server";
import { apiError } from "@/lib/apiError";
import fetchUserCredits from "@/lib/fetchUserCredits";

const CREDIT_COST = 2;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) return apiError("Missing prompt", 400);

    const supabase = await createClient();

    // Authenticate user via Supabase session
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return apiError(userError?.message || "User authentication failed", 401);
    }

    // Fetch user credit info
    const { is_unlimited, used_credits, total_credits } =
      await fetchUserCredits(user.id);

    if (!is_unlimited && used_credits + CREDIT_COST > total_credits) {
      return apiError("Insufficient credits", 403);
    }

    // Generate text using Gemini (Google AI)
    const result = await generateText({
      model: google("gemini-1.5-pro"),
      system:
        "You are a content repurposing expert who transforms content based on user instructions. " +
        "You may be asked to rephrase, condense, expand, add a hook, change tone, or adjust the structure. " +
        "Always preserve the original meaning and respect the format and tone unless instructed otherwise. " +
        "Be concise and intentional in your edits.",
      prompt
    });

    if (!result.text) return apiError("No text was generated", 500);

    // Deduct credits if not unlimited
    if (!is_unlimited) {
      const { error: updateError } = await supabase
        .from("Profiles")
        .update({ used_credits: used_credits + CREDIT_COST })
        .eq("user_id", user.id);

      if (updateError) {
        return apiError("Failed to update user credits", 500);
      }
    }

    // Return generated content
    return NextResponse.json({ text: result.text });
  } catch (err: unknown) {
    console.error("API Error:", err);
    if (err instanceof Error) {
      return apiError(err.message || "Internal server error", 500);
    }
    return apiError("Unknown server error", 500);
  }
}
