import {
 Twitter,
 Linkedin,
 FileText,
 ListOrdered,
 FilePen,
 Youtube
} from "lucide-react";

export const TEXT_FORMATS = [
 { icon: Twitter, label: "Tweet → Other Formats", key: "tweet" },
 { icon: Linkedin, label: "LinkedIn Post → Other Formats", key: "linkedin" },
 { icon: FileText, label: "Reddit Post → Other Formats", key: "reddit" },
 { icon: ListOrdered, label: "X Thread → Other Formats", key: "thread" },
 { icon: FilePen, label: "Blog → Other Formats", key: "blog" }
] as const;

export const MEDIA_FORMATS = [
 { icon: Youtube, label: "YouTube Video → Other Formats", key: "youtube" },
 { icon: null, label: "TikTok Video → Other Formats", key: "tiktok" }
] as const;
