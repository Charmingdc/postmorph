const modifyDraftRequest = async (
  prompt: string,
  onData: (chunk: string) => void
) => {
  const res = await fetch("/api/modifyDraft", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Something went wrong");
  }

  const reader = res.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  if (!reader) throw new Error("No stream found");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onData(chunk);
  }
};

export default modifyDraftRequest;
