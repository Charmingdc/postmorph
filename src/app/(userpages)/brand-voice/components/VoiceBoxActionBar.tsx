"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useActionState } from "react";
import type { ActionState, CustomVoice } from "@/types/index";

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
import { Button } from "@/components/ui/button";

type PageProps = {
  voice: CustomVoice;
};

const initialState: ActionState = {
  type: "" as ActionState["type"],
  message: ""
};

const VoiceBoxActionBar = ({ voice }: PageProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [deleting, confirmBeforeSubmit] = useConfirmDelete(
    () => {
      formRef.current?.requestSubmit();
    },
    {
      message: "Are you sure you want to delete this voice?",
      description: "This action cannot be undone."
    }
  );

  const [voiceName, setVoiceName] = useState(voice.name);
  const [voiceDescription, setVoiceDescription] = useState(voice.description);
  const [voiceInstruction, setVoiceInstruction] = useState(voice.instruction);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updateVoiceState, updateVoiceAction, isUpdatingVoice] = useActionState(
    updateVoice,
    initialState
  );
  const [deleteVoiceState, deleteVoiceAction, isDeletingVoice] = useActionState(
    deleteVoice,
    initialState
  );

  useEffect(() => {
    if (updateVoiceState.message) {
      if (updateVoiceState.type === "error")
        toast.error(updateVoiceState.message);
      else {
        toast.success(updateVoiceState.message);
        setIsDialogOpen(false);
      }
    }
  }, [updateVoiceState]);

  useEffect(() => {
    if (deleteVoiceState.message) {
      if (deleteVoiceState.type === "error")
        toast.error(deleteVoiceState.message);
      else toast.success(deleteVoiceState.message);
    }
  }, [deleteVoiceState]);

  return (
    <div className="flex items-center justify-between gap-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="text-sm text-primary hover:underline focus:outline-none"
            aria-label="Edit voice"
          >
            Edit
          </button>
        </DialogTrigger>
        <DialogContent className="w-[90%] rounded-2xl md:w-[65%]">
          <DialogHeader>
            <DialogTitle>Update Voice Details</DialogTitle>
            <DialogDescription>
              {`Fill the form below to update the details for this custom writing
              style. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>

          <form action={updateVoiceAction}>
            <div className="w-full flex flex-col items-center py-4">
              <input type="hidden" name="voice_id" value={voice.id} />

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
                className="w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 disabled:opacity-40"
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isUpdatingVoice}>
                {isUpdatingVoice ? "Saving Changes..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <form ref={formRef} action={deleteVoiceAction}>
        <input type="hidden" name="voice_id" value={voice.id} />
        <button
          type="submit"
          onClick={confirmBeforeSubmit}
          className="text-sm text-destructive hover:underline focus:outline-none"
          aria-label="Delete voice"
        >
          Delete
        </button>
      </form>

      {isDeletingVoice && deleting && <LoadingScreen />}
    </div>
  );
};

export default VoiceBoxActionBar;
