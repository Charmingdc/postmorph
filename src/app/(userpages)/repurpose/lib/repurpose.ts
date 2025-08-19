import type { DraftType } from "@/types/index";

const repurpose = async (
  sourcePlatform: string,
  targetPlatform: string,
  content: string,
  toneInstruction: string
): Promise<DraftType> => {
  const res = await fetch("/api/repurposeContent", {
    method: "POST",
    body: JSON.stringify({
      sourcePlatform,
      targetPlatform,
      content,
      toneInstruction
    }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Something went wrong");
  }

  const draft = await res.json();
  return draft;
};

export default repurpose;
