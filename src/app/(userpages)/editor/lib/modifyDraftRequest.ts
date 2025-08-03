const modifyDraftRequest = async (
  prompt: string,
  draftId: string
): Promise<{ text: string; modifyCount: number }> => {
  const res = await fetch("/api/modifyDraft", {
    method: "POST",
    body: JSON.stringify({ prompt, draftId }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Something went wrong");
  }

  const { text, modifyCount } = await res.json();
  return { text, modifyCount };
};

export default modifyDraftRequest;
