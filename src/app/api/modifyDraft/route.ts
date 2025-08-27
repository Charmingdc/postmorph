import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createClient } from "@/utils/supabase/server";
import { apiError } from "@/lib/apiError";
import getProfile from "@/lib/user/server";
import logUserAction from "@/lib/logUserAction";

let MAX_REFINEMENT: number;

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
      if (user?.id) {
        await logUserAction(supabase, {
          user_id: user.id,
          action_type: "refine",
          status: "failed",
          error_message: userError?.message || "User authentication failed",
          credit_cost: 0
        });
      }
      return apiError(userError?.message || "User authentication failed", 401);
    }

    // get current user profile
    const profile = await getProfile();

    // get user plan
    if (profile.plan === "pro") {
      MAX_REFINEMENT = 10;
    } else if (profile.plan === "creator") {
      MAX_REFINEMENT = 6;
    } else if (profile.plan === "free" || profile.plan === "starter") {
      MAX_REFINEMENT = 3;
    }

    // Fetch draft with modify_count
    const { data: draft, error: modifyCountError } = await supabase
      .from("drafts")
      .select("modify_count")
      .eq("id", draftId)
      .eq("user_id", user.id)
      .single();

    if (modifyCountError) {
      await logUserAction(supabase, {
        user_id: user.id,
        action_type: "refine",
        status: "failed",
        error_message: "Draft not found or unauthorized",
        user: profile,
        credit_cost: 0
      });
      return apiError("Draft not found or unauthorized", 404);
    }

    const currentCount = draft.modify_count ?? 0;

    if (currentCount >= MAX_REFINEMENT) {
      await logUserAction(supabase, {
        user_id: user.id,
        action_type: "refine",
        status: "failed",
        error_message: "Max refinement reached for this draft",
        user: profile,
        credit_cost: 0
      });
      return apiError("Max refinement reached for this draft", 403);
    }

    // Generate refined text
    const result = await generateText({
      model: google("gemini-2.0-flash-lite"),
      system:
        "You are a content repurposing expert who transforms content based on user instructions. " +
        "Tasks may include rephrasing, condensing, expanding, adding hooks, changing tone, or restructuring. " +
        "Always preserve the original meaning and respect the existing tone and format unless explicitly instructed otherwise. " +
        "Be concise and purposeful in your edits. " +
        "Format your response with proper spacing, paragraphs, and line breaks as needed, but avoid using markdown syntax such as **, ##, etc. " +
        "Always return only the modified content — do not include any introductory phrases like 'Here is your output.'",
      prompt
    });

    if (!result.text) {
      await logUserAction(supabase, {
        user_id: user.id,
        action_type: "refine",
        status: "failed",
        error_message: "No text was generated",
        user: profile,
        credit_cost: 0
      });
      return apiError("No text was generated", 500);
    }

    // Update modify count
    const { error: updateError } = await supabase
      .from("drafts")
      .update({ modify_count: currentCount + 1 })
      .eq("id", draftId)
      .eq("user_id", user.id);

    if (updateError) {
      await logUserAction(supabase, {
        user_id: user.id,
        action_type: "refine",
        status: "failed",
        error_message: "Failed to update draft modify count",
        user: profile,
        credit_cost: 0
      });
      return apiError("Failed to update draft modify count", 500);
    }

    // Log success
    await logUserAction(supabase, {
      user_id: user.id,
      action_type: "refine",
      status: "success",
      error_message: null,
      user: profile,
      credit_cost: 0
    });

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
