"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import useClipboard from "@/hooks/useClipboard";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import PromptPopover from "./PromptPopover";
import CopyButton from "./CopyButton";
import useConfirmDelete from "@/app/hooks/useConfirmDelete";

const ContentEditor = () => {
  const { copied, copy } = useClipboard();
  const formRef = useRef<HTMLFormElement>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [content, setContent] = useState<string>("Demo content");

  const [deleting, confirmBeforeDelete] = useConfirmDelete(
    () => {
      formRef.current?.requestSubmit();
    },
    {
      message: "Are you sure you want to delete this content?",
      description: "This action cannot be undone."
    }
  );

  useEffect(() => {
    if (copied) toast.success("Copied to clipboard successfully");
  }, [copied]);

  return (
    <div className="w-full flex flex-col gap-4 bg-card text-card-foreground p-4 border border-border rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div className="text-sm bg-muted text-muted-foreground font-medium uppercase py-1.5 px-4 rounded-full">
          Tweet
        </div>
        <Button className="rounded-full px-4 py-1.5 h-auto">Save</Button>
      </div>

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="h-56 max-h-72 w-full resize-none rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground shadow-inner focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 whitespace-pre-wrap"
      />

      <form
        ref={formRef}
        onSubmit={e => e.preventDefault()}
        className="flex justify-end items-center gap-4 mt-4"
      >
        <PromptPopover prompt={prompt} setPrompt={setPrompt} />
        <CopyButton copied={copied} onCopy={() => copy(content)} />

        <button
          type="button"
          disabled={deleting}
          onClick={confirmBeforeDelete}
          className="disabled:opacity-50"
        >
          {deleting ? (
            <Spinner width="w-4" height="h-4" />
          ) : (
            <Trash
              size={18}
              className="text-muted-foreground transition-all duration-300 hover:text-red-500"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default ContentEditor;
