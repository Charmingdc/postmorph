"use client";

import Link from "next/link";
import { useEffect } from "react";
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

const DraftBox = ({ drafts, onDelete, isDeleting }: Props) => {
  const { copied, copy } = useClipboard();

  useEffect(() => {
    if (copied) {
      toast.success("Copied to clipboard successfully");
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
      {drafts.map(draft => (
        <div
          key={draft.id}
          className="w-full flex flex-col gap-2 bg-card text-card-foreground p-4 border mb-3 rounded-xl transition-all duration-500
          hover:border-primary"
        >
          <div className="w-fit bg-background text-sm capitalize py-2 px-4 rounded-lg mb-3">
            {draft.type}
          </div>

          <div className="prose prose-sm text-sm whitespace-pre-wrap line-clamp-8">
            {draft.content}
          </div>

          <div className="w-full flex items-center gap-4 mt-4">
            <Button variant="outline" onClick={() => copy(draft.content)}>
              {copied ? <CopyCheck className="text-green-400" /> : <Copy />}
            </Button>

            <Link
              href={`/editor/${draft.id}`}
              className="flex items-center gap-4 p-2 px-3 border border-border rounded-lg transition-all duration-300 hover:bg-accent"
            >
              <PencilLine />
            </Link>

            <Button
              variant="destructive"
              onClick={() => onDelete(draft.id)}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner /> : <Trash />}
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default DraftBox;
