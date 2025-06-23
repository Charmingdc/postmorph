"use client";

import { useTransition } from "react";
import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";
import DraftBox from "./DraftBox";
import deleteDraft from "@/app/(userpages)/drafts/actions/deleteDraft";
import type { DraftType } from "@/lib/types";

const DraftController = ({ drafts }: { drafts: DraftType[] }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteDraft(id);
        router.refresh();
      } catch (err) {
        console.error("Error deleting draft:", err.message);
      }
    });
  };

  return (
    <DraftBox drafts={drafts} onDelete={handleDelete} isDeleting={isPending} />
  );
};

export default DraftController;
