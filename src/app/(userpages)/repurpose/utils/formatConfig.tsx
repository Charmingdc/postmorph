import {
  FileText,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Sparkles,
  Link
} from "lucide-react";

export const inputFormats = [
  "blog",
  "youtube video",
  "instagram reel",
  "x thread",
  "linkedin post"
] as const;

export const defaultTones = ["professional", "casual", "funny", "motivational"];

export const formatIcons: Record<string, JSX.Element> = {
  blog: <FileText className="w-4 h-4" />,
  "youtube video": <Youtube className="w-4 h-4" />,
  "instagram reel": <Instagram className="w-4 h-4" />,
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
    "instagram reel": ["tweet", "x thread", "linkedin post", "reddit post"],
    "x thread": ["linkedin post", "reddit post"],
    "linkedin post": ["x thread", "tweet", "reddit post"]
  };
