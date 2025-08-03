"use client";

import { useState } from "react";
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

const AddVoiceForm = () => {
  const [voiceName, setVoiceName] = useState<string>("");
  const [voiceDescription, setVoiceDescription] = useState<string>("");
  const [voiceInstruction, setVoiceInstruction] = useState<string>("");
  const [postLink, setPostLink] = useState<string>("");
  const [generateWithPost, setGenerateWithPost] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-14 capitalize rounded-xl my-4">
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
        <div className="w-full flex flex-col items-center py-4">
          <input
            type="text"
            placeholder="Give your custom voice a name"
            value={voiceName}
            onChange={e => setVoiceName(e.target.value)}
            className="w-full h-12 bg-input text-xs border border-border p-2 rounded-lg transition-all duration-500 hover:border-primary md:text-md"
          />

          <textarea
            placeholder={
              generateWithPost
                ? "Will automatically generate voice description"
                : "Describe the voice or add notes"
            }
            value={voiceDescription}
            onChange={e => setVoiceDescription(e.target.value)}
            disabled={generateWithPost}
            className={`w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 ${
              generateWithPost
                ? "opacity-40"
                : "transition-all duration-500 hover:border-primary"
            } md:text-md`}
          />

          <textarea
            placeholder={
              generateWithPost
                ? "Will automatically generate voice instruction"
                : "Provide custom instruction to use when writing with this voie"
            }
            value={voiceInstruction}
            onChange={e => setVoiceInstruction(e.target.value)}
            disabled={generateWithPost}
            className={`w-full min-h-20 bg-input text-xs border border-border p-2 rounded-lg mt-4 ${
              generateWithPost
                ? "opacity-40"
                : "transition-all duration-500 hover:border-primary"
            } md:text-md`}
          />

          <p className="font-bold text-muted-foreground my-3"> OR </p>

          <Button
            variant="outline"
            onClick={() => setGenerateWithPost(!generateWithPost)}
            className="w-full capitalize py-6"
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
        </div>
        <DialogFooter>
          <Button type="submit"> Save changes </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVoiceForm;
