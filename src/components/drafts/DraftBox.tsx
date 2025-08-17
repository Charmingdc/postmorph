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
            className="w-full flex flex-col gap-3 bg-card text-card-foreground p-4 border rounded-xl mb-3 hover:border-primary transition-all duration-300"
          >
            {/* Type Badge */}
            <div className="w-fit bg-background text-sm capitalize py-1 px-3 rounded-full">
              {draft.type}
            </div>

            {/* Content Box */}
            <div className="bg-muted/20 p-3 rounded-lg text-sm">
              {draft.type === "x thread" ? (
                <>
                  {parts.slice(0, 2).map((part, i) => (
                    <div key={i} className="mb-4">
                      <div className="text-xs uppercase text-muted-foreground mb-1">
                        Tweet {i + 1}
                      </div>
                      <div className="whitespace-pre-wrap line-clamp-[5]">
                        {part.trim()}
                      </div>
                    </div>
                  ))}
                  {parts.length > 2 && (
                    <div className="text-sm font-semibold text-muted-foreground">
                      ...and {parts.length - 2} more tweet
                      {parts.length - 2 > 1 ? "s" : ""}
                    </div>
                  )}
                </>
              ) : (
                <div className="whitespace-pre-wrap line-clamp-[10]">
                  {draft.content}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
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

              <Link
                href={`/editor/${draft.id}`}
                className="flex items-center gap-2 p-2 border border-border rounded-lg hover:bg-accent transition-all duration-200"
              >
                <PencilLine />
              </Link>

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
