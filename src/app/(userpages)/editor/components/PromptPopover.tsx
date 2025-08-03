"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import modifyDraftRequest from "../lib/modifyDraftRequest";

import {
  Check,
  X,
  Wand,
  Sparkles,
  WandSparkles,
  SpellCheck,
  AlignCenterVertical,
  Expand,
  RefreshCw,
  ListChecks
} from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";

import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/ui/spinner";

const ACTIONS: { action: string; icon: React.ReactNode }[] = [
  { action: "Add Hook", icon: Wand },
  { action: "Fix Grammar", icon: SpellCheck },
  { action: "Condense", icon: AlignCenterVertical },
  { action: "Expand", icon: Expand },
  { action: "Rephrase", icon: RefreshCw },
  { action: "Improve Structure", icon: ListChecks }
];

type Props = {
  draftId: string;
  prompt: string;
  setPrompt: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
  setModifyCount: (val: number) => void;
};

const PromptPopover = ({
  draftId,
  prompt,
  setPrompt,
  content,
  setContent,
  setModifyCount
}: Props) => {
  const [finalPrompt, setFinalPrompt] = useState<string>("");
  const [reqOutput, setReqOutput] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (!prompt.trim()) return;

    setFinalPrompt(`
Instruction: ${prompt}
----------------------
content: ${content}`);
  }, [prompt, content]);

  useEffect(() => {
    if (!isOpen) {
      setReqOutput(null);
      setPrompt("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const { text: output, modifyCount } = await modifyDraftRequest(
        finalPrompt,
        draftId
      );
      setReqOutput(output);
      setModifyCount(modifyCount);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Error processing request");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button type="button">
          <Sparkles
            size={18}
            className="text-muted-foreground transition-all duration-300 hover:text-primary"
            aria-label="Modify Content"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-2 rounded-lg mr-16">
        <div className="w-72 flex flex-col p-1 border rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[82%_18%] gap-3 p-1 pb-2 border-b"
          >
            <input
              name="prompt"
              value={prompt}
              placeholder="Enter custom prompt"
              onChange={e => setPrompt(e.target.value)}
              disabled={isPending}
              className="bg-input text-sm text-input-foreground p-2 border rounded-lg disabled:opacity-50"
            />

            <input
              name="final_prompt"
              value={finalPrompt}
              className="hidden"
              readOnly
            />
            <button
              disabled={isPending || !prompt.trim()}
              className="h-9 w-9 flex items-center justify-center p-1.5 border-l disabled:opacity-50"
            >
              {isPending ? (
                <Spinner width="w-4" height="h-4" />
              ) : (
                <WandSparkles
                  size={18}
                  className="transition-all duration-300 hover:text-primary"
                  aria-label="Apply Prompt"
                />
              )}
            </button>
          </form>

          {isPending ? (
            <div className="w-full flex flex-col justify-center p-2 gap-2 h-64">
              {[...Array(5)].map((_, i) => {
                const width = 100 - (i + i) * 5;

                return (
                  <Skeleton
                    key={i}
                    className={`w-[${width}%] h-10 rounded-lg`}
                  />
                );
              })}
            </div>
          ) : reqOutput ? (
            <div className="w-full flex flex-col p-2 mt-2">
              <ul className="flex items-center justify-between py-1 border-b mb-2">
                <li>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Use this as new content?
                  </h4>
                </li>

                <li className="flex gap-1">
                  <button
                    onClick={() => setReqOutput(null)}
                    className="p-2 rounded hover:bg-red-100 text-red-600"
                    aria-label="Cancel"
                  >
                    <X />
                  </button>

                  <button
                    onClick={() => {
                      setContent(reqOutput);
                      setIsOpen(false);
                    }}
                    className="p-2 rounded hover:bg-green-100 text-green-600"
                    aria-label="Confirm"
                  >
                    <Check />
                  </button>
                </li>
              </ul>
              <p className="w-full h-64 prose prose-sm text-sm whitespace-pre-wrap overflow-y-auto">
                {reqOutput}
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2 p-2 mt-2">
              {ACTIONS.map(({ action, icon: Icon }, i) => (
                <li
                  key={i}
                  onClick={() => setPrompt(action)}
                  className={`w-full flex flex-row gap-2 text-sm text-muted-foreground p-1.5 cursor-pointer ${
                    i === ACTIONS.length - 1 ? "border-none" : "border-b"
                  } hover:bg-muted/50 rounded-md`}
                >
                  <Icon size={18} /> {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PromptPopover;
