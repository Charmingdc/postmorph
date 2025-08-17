"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import { toast } from "sonner";
import { startTransition } from "react";
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
import { Button } from "@/components/ui/button";

type PageProps = {
  voice: CustomVoice;
  onDataUpdate: () => void;
};

const initialState = { type: "", message: "" };

const VoiceBoxActionBar = ({ voice, onDataUpdate }: PageProps) => {
  const [voiceName, setVoiceName] = useState<string>(voice.name);
  const [voiceDescription, setVoiceDescription] = useState<string>(
    voice.description
  );
  const [voiceInstruction, setVoiceInstruction] = useState<string>(
    voice.instruction
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updateVoiceState, updateVoiceAction, isUpdatingVoice] = useActionState(
    updateVoice,
    initialState
  );
  const [deleteVoiceState, , isDeletingVoice] = useActionState(
    deleteVoice,
    initialState
  );

  const [deleting, confirmBeforeSubmit] = useConfirmDelete();

  useEffect(() => {
    if (updateVoiceState.message) {
      const state = updateVoiceState;
      if (state.type === "error") toast.error(state.message);
      else {
        toast.success(state.message);
        setIsDialogOpen(false);
        onDataUpdate();
      }
    } else if (deleteVoiceState.message) {
      const state = deleteVoiceState;
      if (state.type === "error") toast.error(state.message);
      else {
        toast.success(state.message);
        onDataUpdate();
      }
    }
  }, [updateVoiceState, deleteVoiceState, onDataUpdate]);

  const handleDelete = () => {
    confirmBeforeSubmit(() => {
      startTransition(() => {
        deleteVoice({ voice_id: voice.id });
      });
    });
  };

  return (
    <form ref={formRef} className="flex items-center justify-between gap-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="text-sm text-primary hover:underline focus:outline-none"
            aria-label="Edit voice"
            onClick={() => setIsDialogOpen(true)}
          >
            Edit
          </button>
        </DialogTrigger>
        <DialogContent className="w-[90%] rounded-2xl md:w-[65%]">
          <DialogHeader>
            <DialogTitle>Update Voice Details</DialogTitle>
            <DialogDescription>
              Fill the form below to update the details for this custom writing
              style. Click save when you're done.
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
              className="w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 disabled:opacity-40"
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
        onClick={handleDelete}
        className="text-sm text-destructive hover:underline focus:outline-none"
        aria-label="Delete voice"
      >
        Delete
      </button>

      {deleting && isDeletingVoice && <LoadingScreen />}
    </form>
  );
};

export default VoiceBoxActionBar;
