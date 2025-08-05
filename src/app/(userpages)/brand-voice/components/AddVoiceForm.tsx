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
  const [postLink, setPostLink] = useState<string>("");
  const [generateWithPost, setGenerateWithPost] = useState<boolean>(false);
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
      setVoiDescription("");
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
            placeholder={
              generateWithPost
                ? "Will automatically generate voice description"
                : "Describe the voice or add notes"
            }
            name="voice_description"
            value={voiceDescription}
            onChange={e => setVoiceDescription(e.target.value)}
            disabled={generateWithPost || isPending}
            className={`w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 ${
              generateWithPost
                ? "opacity-40"
                : "transition-all duration-500 hover:border-primary"
            } disabled:opacity-40 md:text-md`}
          />

          <textarea
            placeholder={
              generateWithPost
                ? "Will automatically generate voice instruction"
                : "Provide custom instruction to use when writing with this voie"
            }
            name="voice_instruction"
            value={voiceInstruction}
            onChange={e => setVoiceInstruction(e.target.value)}
            disabled={generateWithPost || isPending}
            className={`w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 ${
              generateWithPost
                ? "opacity-40"
                : "transition-all duration-500 hover:border-primary"
            } md:text-md`}
          />

          <p className="font-bold text-muted-foreground my-3"> OR </p>

          <Button
            variant="outline"
            type="button"
            disabled={isPending}
            onClick={() => setGenerateWithPost(!generateWithPost)}
            className="w-full capitalize py-6 disabled:opacity-40"
          >
            {generateWithPost
              ? "Set voice details manually"
              : "Generate voice details with a post"}
          </Button>

          {generateWithPost && (
            <div className="w-full flex flex-col items-center gap-2 mt-2">
              <input
                type="url"
                placeholder="Paste post link here"
                value={postLink}
                onChange={e => setPostLink(e.target.value)}
                className="w-full h-12 bg-input text-xs border border-border p-2 rounded-lg transition-all duration-500 hover:border-primary md:text-md"
              />
              <Button>
                <WandSparkles /> Generate
              </Button>
            </div>
          )}
        </form>
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving Changes..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVoiceForm;
