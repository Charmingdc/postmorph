"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import useClipboard from "@/hooks/useClipboard";

import { Sparkles, Copy, CopyCheck, Trash } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const ContentEditor = () => {
  const { copied, copy } = useClipboard();
  useEffect(() => {
    if (copied) {
      toast.success("Copied to clipboard successfully");
    }
  }, [copied]);

  const [prompt, setPropmt] = useState<string>("");
  const [content, setContent] = useState<string>("Demo content");

  const [deleting, setDeleting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const confirmBeforeDelete = () => {
    toast("Are you sure you want to delete?", {
      duration: 5000,
      action: (
        <Button
          variant="destructive"
          className="h-auto text-xs py-1.5 px-3 rounded-full ml-6"
          onClick={() => {
            toast.dismiss();

            setDeleting(true);
            formRef.current?.requestSubmit();
          }}
        >
          Proceed
        </Button>
      )
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-card text-card-foreground p-4 border border-border rounded-2xl shadow-sm">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="w-fit bg-muted text-muted-foreground text-sm font-medium uppercase py-1.5 px-4 rounded-full tracking-wide">
          Tweet
        </div>

        <Button className="h-auto py-1.5 px-4 rounded-full"> Save </Button>
      </div>

      <textarea
        name="content"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="h-56 max-h-72 w-full resize-none rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground shadow-inner focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all duration-200 whitespace-pre-wrap"
      />

      <form
        ref={formRef}
        onSubmit={e => e.preventDefault()}
        className="w-full flex flex-row items-center justify-end gap-4 mt-4"
      >
        <Popover>
          <PopoverTrigger asChild>
            <button type="button">
              <Sparkles size={18} className="text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-2 rounded-lg mr-24">
            <div className="w-56 h-32 flex flex-col items-center p-3 border rounded-lg">
              <input
                placeholder="Enter custom prompt"
                value={prompt}
                onChange={e => setPropmt(e.target.value)}
              />
            </div>
          </PopoverContent>
        </Popover>

        <button type="button" onClick={() => copy(content)}>
          {copied ? (
            <CopyCheck size={18} className="text-green-400" />
          ) : (
            <Copy size={18} className="text-muted-foreground" />
          )}
        </button>

        <button onClick={confirmBeforeDelete}>
          {deleting ? (
            <Spinner width="w-4" height="h-4" />
          ) : (
            <Trash size={18} className="text-muted-foreground" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ContentEditor;
