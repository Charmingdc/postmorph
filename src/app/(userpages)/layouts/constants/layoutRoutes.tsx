import type { LucideIcon } from 'lucide-react';
import {
  FilePlus2,
  FileText,
  CalendarClock,
  MicVocal,
  BookOpen
} from 'lucide-react';

interface Page {
  url: string;
  text: string;
  icon: LucideIcon;
}

type LayoutRoutes = {
  [section: string]: Page[];
};

export const layoutRoutes: LayoutRoutes = {
  content: [
    { url: '/repurpose', text: 'Repurpose New', icon: FilePlus2 },
    { url: '/drafts', text: 'Drafts', icon: FileText },
    { url: '/scheduled-posts', text: 'Scheduled Posts', icon: CalendarClock }
  ],
  aiTools: [{ url: '/brand-voice', text: 'Brand Voice', icon: MicVocal }],
  more: [{ url: '/learning-center', text: 'Learning Center', icon: BookOpen }]
};