import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createClient } from "@/utils/supabase/server";
import { apiError } from "@/lib/apiError";

const MAX_REFINEMENT = 3;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, draftId } = body;

    if (!prompt || !draftId) {
      return apiError("Missing prompt or draft Id", 400);
    }

    const supabase = await createClient();

    // Authenticate user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return apiError(userError?.message || "User authentication failed", 401);
    }

    // Fetch draft with modify_count
    const { data: draft, error: modifyCountError } = await supabase
      .from("drafts")
      .select("modify_count")
      .eq("id", draftId)
      .eq("user_id", user.id)
      .single();

    if (modifyCountError) {
      return apiError("Draft not found or unauthorized", 404);
    }

    const currentCount = draft.modify_count ?? 0;

    if (currentCount >= MAX_REFINEMENT) {
      return apiError("Max refinement reached for this draft", 403);
    }

    // Generate refined text
    const result = await generateText({
      model: google("gemini-2.0-flash-lite"),
      system:
        "You are a content repurposing expert who transforms content based on user instructions. " +
        "You may be asked to rephrase, condense, expand, add a hook, change tone, or adjust the structure. " +
        "Always preserve the original meaning and respect the format and tone unless instructed otherwise. " +
        "Be concise and intentional in your edits.",
      prompt
    });

    if (!result.text) {
      return apiError("No text was generated", 500);
    }

    // Update modify count
    const { error: updateError } = await supabase
      .from("drafts")
      .update({ modify_count: currentCount + 1 })
      .eq("id", draftId)
      .eq("user_id", user.id);

    if (updateError) {
      return apiError("Failed to update draft modify count", 500);
    }

    // Return generated result
    return NextResponse.json({
      text: result.text,
      modifyCount: currentCount + 1
    });
  } catch (err: unknown) {
    console.error("API Error:", err);
    if (err instanceof Error) {
      return apiError(err.message || "Internal server error", 500);
    }
    return apiError("Unknown server error", 500);
  }
}
