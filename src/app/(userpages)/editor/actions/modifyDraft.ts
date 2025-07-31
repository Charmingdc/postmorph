"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import type { ActionState } from "@/types/index";

const modifyDraft = async (
  prev: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const prompt = formData.get("prompt") as string;

  if (!prompt)
    return { type: "error", message: "Please provide a valid prompt" };

  return { type: "success", message: "" };
};
export default modifyDraft;
