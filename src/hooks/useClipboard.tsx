import { useState } from "react";

const useClipboard = (timeout: number = 2000) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return { copied, copy };
};

export default useClipboard;
