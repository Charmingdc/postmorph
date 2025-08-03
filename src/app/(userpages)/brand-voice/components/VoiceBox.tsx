import { WandSparkles, Feather, Mic } from "lucide-react";
import type { CustomVoice } from "@/types/index";

type VoiceBoxProps = {
  index: number;
  voice: CustomVoice;
};

const iconMap = [WandSparkles, Feather, Mic];

const VoiceBox = ({ index, voice }: VoiceBoxProps) => {
  const { name, description, instruction } = voice;
  const Icon = iconMap[index % iconMap.length];
  console.log(`${name}'s instruction: ${instruction}`);

  return (
    <div className="w-full flex flex-col items-start gap-4 p-4 rounded-xl bg-card border border-border relative transition-all duration-500 hover:border-primary">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-background text-foreground">
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1">
        <h2 className="font-semibold text-foreground mb-2">{name}</h2>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          className="text-sm text-primary hover:underline focus:outline-none"
          aria-label="Expand description"
        >
          Edit
        </button>

        <button
          className="text-sm text-destructive hover:underline focus:outline-none"
          aria-label="Delete voice"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VoiceBox;
