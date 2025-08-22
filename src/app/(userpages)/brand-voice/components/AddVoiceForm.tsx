"use client";

import { useState, useEffect, useActionState } from "react";
import { toast } from "sonner";

import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import addNewVoice from "../actions/addNewVoice";

const AddVoiceForm = ({ userId }: { userId: string }) => {
  const [voiceName, setVoiceName] = useState<string>("");
  const [voiceDescription, setVoiceDescription] = useState<string>("");
  const [voiceInstruction, setVoiceInstruction] = useState<string>("");

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [formState, formAction, isPending] = useActionState(addNewVoice, {
    type: "",
    message: ""
  });

  useEffect(() => {
    if (!formState.message) return;
    if (formState.type === "error") {
      toast.error(formState.message);
    } else {
      toast.success(formState.message);
      setIsDialogOpen(false);
      setVoiceName("");
      setVoiceDescription("");
      setVoiceInstruction("");
    }
  }, [formState]);

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="h-14 capitalize rounded-xl my-4"
        >
          <WandSparkles /> Add new custom voice
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-2xl md:-[65%]">
        <DialogHeader>
          <DialogTitle> Add New Custom Voice </DialogTitle>
          <DialogDescription>
            {`Fill the form below to add your custom writing style. Click save
            when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="w-full flex flex-col items-center py-4"
        >
          <input
            type="text"
            name="user_id"
            value={userId}
            className="hidden"
            readOnly
          />

          <input
            type="text"
            placeholder="Give your custom voice a name"
            name="voice_name"
            value={voiceName}
            onChange={e => setVoiceName(e.target.value)}
            disabled={isPending}
            className="w-full h-12 bg-input text-xs border border-border p-2 rounded-lg transition-all duration-500 hover:border-primary disabled:opacity-40 md:text-md"
          />

          <textarea
            placeholder="Describe the voice or add notes"
            name="voice_description"
            value={voiceDescription}
            onChange={e => setVoiceDescription(e.target.value)}
            disabled={isPending}
            className="w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 transition-all duration-500 hover:border-primary
            disabled:opacity-40 md:text-md"
          />

          <textarea
            placeholder="Provide custom instruction to use when writing with this voice"
            name="voice_instruction"
            value={voiceInstruction}
            onChange={e => setVoiceInstruction(e.target.value)}
            disabled={isPending}
            className="w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 transition-all duration-500 hover:border-primary
            md:text-md"
          />

          <Button type="submit" className="w-full mt-2" disabled={isPending}>
            {isPending ? "Saving Changes..." : "Save changes"}
          </Button>
        </form>
        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsDialogOpen(false)}
            disabled={isPending}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVoiceForm;
