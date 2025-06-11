import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  WandSparkles,
  MicVocal,
  BookOpen
} from "lucide-react";

interface Page {
  url: string;
  text: string;
  icon: LucideIcon;
}

type SidebarRoutes = {
  [section: string]: Page[];
};

export const footerRoutes: Page[] = [
  { url: "/dashboard", text: "Dashboard", icon: LayoutDashboard },
  { url: "/drafts", text: "Drafts", icon: FileText },
  { url: "/repurpose", text: "New", icon: WandSparkles },
  { url: "/brand-voice", text: "Voice", icon: MicVocal },
  { url: "/learning-center", text: "Learn", icon: BookOpen }
];

export const sidebarRoutes: SidebarRoutes = {
  content: [
    { url: "/repurpose", text: "Repurpose New", icon: FilePlus2 },
    { url: "/drafts", text: "Drafts", icon: FileText }
  ],
  aiTools: [{ url: "/brand-voice", text: "Brand Voice", icon: MicVocal }],
  more: [{ url: "/learning-center", text: "Learning Center", icon: BookOpen }]
};
