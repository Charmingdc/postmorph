import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { createClient } from "@/utils/supabase/server";
import { apiError } from "@/app/utils/apiError";
import fetchUserCredits from "@/lib/fetchUserCredits";
import { prepareContent, buildPrompt } from "./utils/helpers";
import getProfile from "@/lib/user/server";
import logUserAction from "@/lib/logUserAction";

let CREDIT_COST = 4;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sourcePlatform, targetPlatform, content, toneInstruction } = body;

    if (!sourcePlatform || !targetPlatform || !content || !toneInstruction) {
      return apiError("Incomplete request body", 400);
    }

    if (sourcePlatform === "blog") {
      CREDIT_COST = 5;
    } else if (
      sourcePlatform === "youtube video" ||
      ssourcePlatform === "tiktok video"
    ) {
      CREDIT_COST = 8;
    }

    const finalContent = await prepareContent(sourcePlatform, content);
    const prompt = buildPrompt(
      sourcePlatform,
      targetPlatform,
      toneInstruction,
      finalContent
    );

    const supabase = await createClient();
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (!user || userError) {
      if (user?.id) {
        await logUserAction(supabase, {
          user_id: user.id,
          action_type: "repurpose",
          status: "failed",
          error_message: userError?.message || "User authentication failed",
          credit_cost: 0
        });
      }
      return apiError(userError?.message || "User authentication failed", 401);
    }

    // get current user profile
    const profile = await getProfile();
    if (!profile) {
      await logUserAction(supabase, {
        user_id: user.id,
        action_type: "repurpose",
        status: "failed",
        error_message: "Unable to fetch user profile",
        credit_cost: 0
      });

      return apiError("Unable to fetch user profile", 404);
    }

    // get user credit info
    const { used_credits, total_credits, is_unlimited } =
      await fetchUserCredits(user.id);

    if (!is_unlimited && CREDIT_COST > total_credits - used_credits) {
      await logUserAction(supabase, {
        user_id: user.id,
        action_type: "repurpose",
        status: "failed",
        error_message: "Not enough credits",
        user: profile,
        credit_cost: 0
      });
      return apiError(
        "You don't have enough credits to repurpose this content",
        403
      );
    }

    const result = await generateText({
      model: google("gemini-2.5-flash-lite") as unknown as Parameters<typeof generateText>[0]["model"],
      system:
        "You are a content repurposing expert who transforms content based on user instructions. " +
        "Always preserve the original meaning and strictly follow the requested tone. " +
        "Be concise and adapt your style to the target platform’s conventions — tone, emojis, hashtags, call-to-actions, text formating convention and spacing. " +
        "Completely strip all markdown, HTML tags, or special formatting from the input and ensure the output contains NONE. " +
        "Format using natural text conventions such as line breaks, paragraphs, and spacing where appropriate. " +
        "Do NOT include markdown syntax (no **bold**, *italics*, # headings, `code`, links, or blockquotes). " +
        "Always return ONLY the repurposed content — no commentary, notes, or prefaces. " +
        "If the input contains markdown, remove it and adapt the content naturally to the target platform.",
      prompt
    });

    if (!result.text) {
      await logUserAction(supabase, {
        user_id: user.id,
        action_type: "repurpose",
        status: "failed",
        error_message: "No text was generated",
        user: profile,
        credit_cost: 0
      });
      return apiError("No text was generated", 500);
    }

    // Deduct credits here
    if (!is_unlimited) {
      const { error: updateError } = await supabase
        .from("Profiles")
        .update({ used_credits: used_credits + CREDIT_COST })
        .eq("user_id", user.id);

      if (updateError) {
        await logUserAction(supabase, {
          user_id: user.id,
          action_type: "repurpose",
          status: "failed",
          error_message: "Failed to update credits usage",
          user: profile,
          credit_cost: 0
        });
        return apiError("Failed to update credits usage", 500);
      }
    }

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
      await logUserAction(supabase, {
        user_id: user.id,
        action_type: "repurpose",
        status: "failed",
        error_message: "Failed to save generated content as draft",
        user: profile,
        credit_cost: CREDIT_COST
      });
      return apiError("Failed to save generated content as draft", 500);
    }

    // Success log, credits have been deducted
    await logUserAction(supabase, {
      user_id: user.id,
      action_type: "repurpose",
      status: "success",
      error_message: null,
      user: profile,
      credit_cost: CREDIT_COST
    });

    return NextResponse.json(draft);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes("high traffic")) {
        return apiError(err.message, 429);
      }
      return apiError(err.message || "Internal server error", 500);
    }
    return apiError("Unknown server error", 500);
  }
}
