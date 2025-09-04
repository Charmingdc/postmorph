"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { toast } from "sonner";

import useClipboard from "@/hooks/useClipboard";
import useConfirmDelete from "@/app/hooks/useConfirmDelete";
import useProfile from "@/app/hooks/useProfile";
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
type Plan = "pro" | "creator" | "free" | "starter";

const TWEET_BREAK = "--tweet break--";

const ContentEditor = ({ user_id, draft }: PageProps) => {
  const { profile, loadingProfile } = useProfile();
  const { copied, copy } = useClipboard();
  const formRef = useRef<HTMLFormElement>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [content, setContent] = useState<string>(draft.content);
  const [modifyCount, setModifyCount] = useState<number>(draft.modify_count);

  const [updateDraftState, updateDraftAction, isUpdatingDraft] = useActionState(
    updateDraft,
    {
      type: "" as "" | "success" | "error",
      message: ""
    }
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

  const addNewTweetAt = (index: number) => {
    const updated = [
      ...tweetArray.slice(0, index + 1),
      "",
      ...tweetArray.slice(index + 1)
    ];
    setContent(updated.join(TWEET_BREAK));
  };

  const removeTweet = (index: number) => {
    if (tweetArray.length === 1) return;

    const updated = tweetArray.filter((_, i) => i !== index);
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

      {/* Content Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tweetArray.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-muted/40 border border-border rounded-xl p-3 gap-2"
          >
            {/* Only show Tweet label + remove button if it's a thread */}
            {isThread && (
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  Tweet {index + 1}
                </span>

                {tweetArray.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTweet(index)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
            )}

            {/* Editor */}
            <textarea
              value={item}
              onChange={e => updateTweet(index, e.target.value)}
              className="h-72 w-full resize-none bg-card border border-transparent px-4 py-2 text-sm text-foreground shadow-inner focus:outline-none focus:border-t transition-all duration-200 whitespace-pre-wrap"
              placeholder="Write something..."
            />

            {/* Footer: Counter + Add button */}
            <div className="flex justify-between items-center">
              {/* Only show character count for tweets or threads */}
              {(draft.type === "tweet" || isThread) && (
                <p className={`${lengthClass(item)} text-xs`}>
                  {item.length} / <strong>280</strong>
                </p>
              )}

              {/* Only allow adding tweets for threads */}
              {isThread && (
                <Button
                  type="button"
                  onClick={() => addNewTweetAt(index)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-xs"
                >
                  <Plus size={14} /> Add Tweet
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {loadingProfile ? (
        <p className="w-full flex justify-end text-sm text-muted-foreground">
          Loading Usage
        </p>
      ) : (
       profile &&  <ModifyCountBadge
          modifyCount={modifyCount}
          userPlan={profile.plan as Plan}
        /> 
      )}

      {/* Delete Draft */}
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
