"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { toast } from "sonner";

import useClipboard from "@/hooks/useClipboard";
import useConfirmDelete from "@/app/hooks/useConfirmDelete";
import updateDraft from "../actions/updateDraft";
import deleteDraft from "../actions/deleteDraft";
import type { DraftType } from "@/types/index";

import { Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import ModifyCountBadge from "./ModifyCountBadge";
import PromptPopover from "./PromptPopover";
import CopyButton from "./CopyButton";
import Spinner from "@/components/ui/spinner";

type PageProps = {
  user_id: string;
  draft: DraftType;
};

const TWEET_BREAK = "--tweet break--";

const ContentEditor = ({ user_id, draft }: PageProps) => {
  const { copied, copy } = useClipboard();
  const formRef = useRef<HTMLFormElement>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [content, setContent] = useState<string>(draft.content);
  const [modifyCount, setModifyCount] = useState<number>(draft.modify_count);

  const [updateDraftState, updateDraftAction, isUpdatingDraft] = useActionState(
    updateDraft,
    { type: "", message: "" }
  );

  const [deleting, confirmBeforeDelete] = useConfirmDelete(
    () => formRef.current?.requestSubmit(),
    {
      message: "Are you sure you want to delete this content?",
      description: "This action cannot be undone."
    }
  );

  const isThread = draft.type === "x thread";
  const tweetArray = isThread ? content.split(TWEET_BREAK) : [content];

  const updateTweet = (index: number, value: string) => {
    const updated = [...tweetArray];
    updated[index] = value;
    setContent(updated.join(TWEET_BREAK));
  };

  const addNewTweet = () => {
    const updated = [...tweetArray, ""];
    setContent(updated.join(TWEET_BREAK));
  };

  const lengthClass = (text: string) =>
    text.length >= 280
      ? "text-red-500"
      : text.length >= 240
      ? "text-yellow-500"
      : "text-muted-foreground";

  useEffect(() => {
    if (copied) toast.success("Copied to clipboard successfully");
  }, [copied]);

  useEffect(() => {
    if (!updateDraftState.message) return;
    if (updateDraftState.type === "error")
      toast.error(updateDraftState.message);
    else toast.success(updateDraftState.message);
  }, [updateDraftState]);

  return (
    <div className="w-full flex flex-col gap-4 bg-card text-card-foreground p-4 border border-border rounded-2xl shadow-sm">
      <form
        action={updateDraftAction}
        className="flex justify-between items-center"
      >
        <div className="text-sm bg-muted text-muted-foreground font-medium uppercase py-1.5 px-4 rounded-full">
          {draft.type}
        </div>

        <input
          type="text"
          name="user_id"
          value={user_id}
          className="hidden"
          readOnly
        />
        <input
          type="text"
          name="draft_id"
          value={draft.id}
          className="hidden"
          readOnly
        />
        <textarea
          name="new_content"
          value={content}
          className="hidden"
          readOnly
        />

        <Button
          disabled={draft.content === content || isUpdatingDraft}
          className="rounded-full px-4 py-1.5 h-auto"
        >
          {isUpdatingDraft ? "Saving..." : "Save"}
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tweetArray.map((tweet, index) => (
          <div key={index} className="relative">
            <textarea
              value={tweet}
              onChange={e => updateTweet(index, e.target.value)}
              className="h-40 w-full resize-none bg-card border border-transparent px-4 py-2 text-sm text-foreground shadow-inner focus:outline-none focus:border-t transition-all duration-200 whitespace-pre-wrap mb-2"
              placeholder={`Tweet ${index + 1}`}
            />
            {(draft.type === "x thread" || draft.type === "tweet") && (
              <p
                className={`${lengthClass(
                  tweet
                )} text-xs absolute bottom-1 right-3`}
              >
                {tweet.length} / <strong>280</strong>
              </p>
            )}
            {isThread && index < tweetArray.length - 1 && (
              <hr className="mt-4 border-t border-muted" />
            )}
          </div>
        ))}
      </div>

      {isThread && (
        <Button
          type="button"
          onClick={addNewTweet}
          variant="outline"
          size="sm"
          className="w-fit flex items-center gap-2 text-xs"
        >
          <Plus size={14} /> Add Tweet
        </Button>
      )}

      <ModifyCountBadge modifyCount={modifyCount} />

      <form
        ref={formRef}
        action={deleteDraft}
        className="flex justify-end items-center gap-4 mt-4"
      >
        <input
          type="text"
          name="draft_id"
          value={draft.id}
          className="hidden"
          readOnly
        />

        <PromptPopover
          draftId={draft.id}
          prompt={prompt}
          setPrompt={setPrompt}
          content={content}
          setContent={setContent}
          setModifyCount={setModifyCount}
        />

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
