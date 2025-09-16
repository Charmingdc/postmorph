import {
  FileText,
  Youtube,
  Twitter,
  Linkedin,
  Sparkles,
  Link
} from "lucide-react";
import TikTok from "@/components/icon/TikTok";

import type { DefaultTone } from "@/types/index";

export const inputFormats = [
  "blog",
  "x thread",
  "reddit post",
  "linkedin post",
  "youtube video",
  "tiktok video"
] as const;

export const defaultTones: DefaultTone[] = [
  {
    id: "default-professional",
    name: "professional",
    instruction:
      "Respond with formal, concise, and respectful language. Use clear structure, avoid slang, and maintain a polished tone suitable for business or academic contexts."
  },
  {
    id: "default-casual",
    name: "casual",
    instruction:
      "Respond in a relaxed and friendly way, as if chatting with a friend. Use simple language, light expressions, and an approachable tone."
  },
  {
    id: "default-funny",
    name: "funny",
    instruction:
      "Respond with humor, witty remarks, or playful exaggeration while still keeping the answer clear. Use jokes, puns, or light sarcasm when appropriate."
  },
  {
    id: "default-motivational",
    name: "motivational",
    instruction:
      "Respond with encouragement, positivity, and uplifting language. Use inspiring phrases and supportive tone to boost confidence and motivation."
  }
];

export const formatIcons: Record<string, JSX.Element> = {
  blog: <FileText className="w-4 h-4" />,
  "youtube video": <Youtube className="w-4 h-4" />,
  "tiktok video": <TikTok className="w-4 h-4" />,
  "x thread": <Twitter className="w-4 h-4" />,
  "linkedin post": <Linkedin className="w-4 h-4" />,
  "reddit post": <Link className="w-4 h-4" />,
  tweet: <Twitter className="w-4 h-4" />,
  professional: <Sparkles className="w-4 h-4" />,
  casual: <Sparkles className="w-4 h-4" />,
  funny: <Sparkles className="w-4 h-4" />,
  motivational: <Sparkles className="w-4 h-4" />
};

export const outputOptionsMap: Record<(typeof inputFormats)[number], string[]> =
  {
    blog: ["tweet", "x thread", "linkedin post", "reddit post"],
    "youtube video": ["tweet", "x thread", "linkedin post", "reddit post"],
    "tiktok video": ["tweet", "x thread", "linkedin post", "reddit post"],
    "x thread": ["tweet", "linkedin post", "reddit post"],
    "linkedin post": ["tweet", "reddit post"],
    "reddit post": ["tweet", "linkedin post"]
  };
