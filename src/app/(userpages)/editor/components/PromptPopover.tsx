"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import {
  Wand,
  Sparkles,
  WandSparkles,
  
  SpellCheck,
  AlignCenterVertical,
  Expand,
  RefreshCw,
  ListChecks
} from "lucide-react";

const ACTIONS = [
  { action: "Add Hook", icon: Wand },
  { action: "Fix Grammar", icon: SpellCheck },
  { action: "Condense", icon: AlignCenterVertical },
  { action: "Expand", icon: Expand },
  { action: "Rephrase", icon: RefreshCw },
  { action: "Improve Structure", icon: ListChecks }
];

type Props = {
  prompt: string;
  setPrompt: (val: string) => void;
};

const PromptPopover = ({ prompt, setPrompt }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">
          <Sparkles size={18} className="text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2 rounded-lg mr-16">
        <div className="w-72 flex flex-col p-1 border rounded-lg">
          <form className="grid grid-cols-[82%_18%] gap-3 p-1 pb-2 border-b">
            <input
              placeholder="Enter custom prompt"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="bg-input text-sm text-input-foreground p-2 border rounded-lg"
            />
            <button className="h-9 w-9 flex items-center justify-center p-1.5 border-l">
              <WandSparkles
                size={18}
                className="transition-all duration-300 hover:text-primary"
              />
            </button>
          </form>

          <ul className="flex flex-col gap-2 p-2 mt-2">
            {ACTIONS.map(({ action, icon: Icon }, i) => (
              <li
                key={i}
                onClick={() => setPrompt(action)}
                className={`w-full flex flex-row gap-2 text-sm text-muted-foreground p-1.5 cursor-pointer ${
                  i === ACTIONS.length - 1 ? "border-none" : "border-b"
                }`}
              >
                <Icon size={18} /> {action}
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PromptPopover;
