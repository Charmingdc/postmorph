"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import { toast } from "sonner";
import type { CustomVoice } from "@/types/index";

import useConfirmDelete from "@/app/hooks/useConfirmDelete";
import updateVoice from "../actions/updateVoice";
import deleteVoice from "../actions/deleteVoice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { LoadingScreen } from "@/components/ui/loading-screen";

type PageProps = {
  voice: CustomVoice;
};

const initialState = { type: "", message: "" };
const VoiceBoxActionBar = ({ voice }: PageProps) => {
  const [voiceName, setVoiceName] = useState<string>(voice.name);
  const [voiceDescription, setVoiceDescription] = useState<string>(
    voice.description
  );
  const [voiceInstruction, setVoiceInstruction] = useState<string>(
    voice.instruction
  );

  const [deleteRef] = useRef<HTMLButtonElement>(null);
  const [updateVoiceState, updateVoiceAction, isUpdatingVoice] = useActionState(
    updateVoice,
    initialState
  );
  const [deleteVoiceState, deleteVoiceAction, isDeletingVoice] = useActionState(
    deleteVoice,
    initialState
  );

  const [deleting, confirmBeforeSubmit] = useConfirmDelete(
    () => {
      delteRef.current?.requestSubmit();
    },
    {
      message: "Are you sure you want to delete this voice?",
      description: "This action cannot be undone."
    }
  );

  useEffect(() => {
    if (updateVoiceState.message) {
      const state = deleteVoiceState;
      if (state.type === "error") {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    } else if (deleteVoiceState.message) {
      const state = deleteVoiceState;
      if (state.type === "error") {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [updateVoiceState, deleteVoiceState, initialState]);

  return (
    <form className="flex items-center justify-between gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="text-sm text-primary hover:underline focus:outline-none"
            aria-label="Edit voice"
          >
            Edit
          </button>
        </DialogTrigger>
        <DialogContent className="w-[90%] rounded-2xl md:-[65%]">
          <DialogHeader>
            <DialogTitle> Update Voice Details </DialogTitle>
            <DialogDescription>
              {`Fill the form below to update the details for this custom writing style. Click save
            when you're done.`}
            </DialogDescription>
          </DialogHeader>

          <div className="w-full flex flex-col items-center py-4">
            <input
              type="text"
              name="voice_name"
              value={voiceName}
              onChange={e => setVoiceName(e.target.value)}
              disabled={isUpdatingVoice}
              className="w-full h-12 bg-input text-xs border border-border p-2 rounded-lg transition-all duration-500 hover:border-primary md:text-md disabled:opacity-40"
            />

            <textarea
              name="voice_description"
              value={voiceDescription}
              onChange={e => setVoiceDescription(e.target.value)}
              disabled={isUpdatingVoice}
              className="w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 disabled:opacity-40"
            />

            <textarea
              name="voice_instruction"
              value={voiceInstruction}
              onChange={e => setVoiceInstruction(e.target.value)}
              disabled={isUpdatingVoice}
              className="w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 disablrd:opacity-40"
            />
          </div>

          <DialogFooter>
            <Button formAction={updateVoiceAction} disabled={isUpdatingVoice}>
              {isUpdatingVoice ? "Saving Changes..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <button
        formAction={deleteVoiceAction}
        onClick={confirmBeforeSubmit}
        className="text-sm text-destructive hover:underline focus:outline-none"
        aria-label="Delete voice"
      >
        Delete
      </button>

      <input
        type="text"
        mame="voice_id"
        value={voice.id}
        className="hidden"
        readOnly
      />

      {isDeletingVoice && <LoadingScreen />}
    </form>
  );
};
export default VoiceBoxActionBar;
