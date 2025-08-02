const modifyDraftRequest = async (prompt: string): Promise<string> => {
  const res = await fetch("/api/modifyDraft", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Something went wrong");
  }

  const { text } = await res.json();
  return text;
};

export default modifyDraftRequest;
