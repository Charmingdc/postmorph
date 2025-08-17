"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, CopyCheck, Trash, PencilLine } from "lucide-react";

import NoDataCard from "@/components/ui/no-data-card";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

import useClipboard from "@/hooks/useClipboard";
import type { DraftType } from "@/types/index";

type Props = {
  drafts: DraftType[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
};

const TWEET_BREAK = "--tweet break--";

const DraftBox = ({ drafts, onDelete, isDeleting }: Props) => {
  const { copied, copy } = useClipboard();
  const [activeCopyIndex, setActiveCopyIndex] = useState<number | null>(null);
  const [activeDeleteIndex, setActiveDeleteIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (copied) {
      toast.success("Copied to clipboard successfully");
      setTimeout(() => setActiveCopyIndex(null), 1200);
    }
  }, [copied]);

  if (!drafts || drafts.length === 0) {
    return (
      <NoDataCard
        title="No Drafts"
        message="You don't have any drafts saved."
      />
    );
  }

  return (
    <>
      {drafts.map((draft, index) => {
        const parts = draft.content.split(TWEET_BREAK);

        return (
          <div
            key={draft.id}
            className="w-full flex flex-col gap-2 bg-card text-card-foreground p-4 border mb-3 rounded-xl transition-all duration-500 hover:border-primary"
          >
            {/* Type Badge */}
            <div className="w-fit bg-background text-sm capitalize py-2 px-4 rounded-lg mb-3">
              {draft.type}
            </div>

            {/* Content Renderer */}
            <div className="prose prose-sm text-sm whitespace-pre-wrap">
              {draft.type === "x thread" ? (
                parts.map((part, i) => (
                  <div key={i}>
                    <div className="my-4 text-xs uppercase tracking-wide text-muted-foreground">
                      / {i + 1}
                    </div>
                    <div>{part.trim()}</div>
                  </div>
                ))
              ) : (
                <div>{draft.content}</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="w-full flex items-center gap-4 mt-4">
              {/* Copy */}
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCopyIndex(index);
                  copy(draft.content);
                }}
              >
                {activeCopyIndex === index && copied ? (
                  <CopyCheck className="text-green-400" />
                ) : (
                  <Copy />
                )}
              </Button>

              {/* Edit */}
              <Link
                href={`/editor/${draft.id}`}
                className="flex items-center gap-4 p-2 px-3 border border-border rounded-lg transition-all duration-300 hover:bg-accent"
              >
                <PencilLine />
              </Link>

              {/* Delete */}
              <Button
                variant="destructive"
                onClick={() => {
                  setActiveDeleteIndex(index);
                  onDelete(draft.id);
                }}
                disabled={isDeleting && activeDeleteIndex === index}
              >
                {isDeleting && activeDeleteIndex === index ? (
                  <Spinner />
                ) : (
                  <Trash />
                )}
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DraftBox;
