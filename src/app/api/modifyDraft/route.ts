import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { apiError } from "@/lib/apiError";

export const runtime = "edge";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) return apiError("Missing prompt", 400);

    const result = await streamText({
      model: "gemini-2.5-flash",
      provider: google,
      system:
        "You are a content repurposing expert who transforms content based on user instructions. " +
        "You may be asked to rephrase, condense, expand, add a hook, change tone, or adjust the structure. " +
        "Always preserve the original meaning and respect the format and tone unless instructed otherwise. " +
        "Be concise and intentional in your edits.",
      prompt,
      onError({ error }) {
        throw new Error(error.message);
      },
      onFinish() {
        console.log("User credit deducted");
      }
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const part of result.textStream) {
          controller.enqueue(new TextEncoder().encode(part));
        }
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache"
      }
    });
  } catch (err: unknown) {
    if (err instanceof Error)
      return apiError(err.message || "Internal server error", 500);
  }
}
