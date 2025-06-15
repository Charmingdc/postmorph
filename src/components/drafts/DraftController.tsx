"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import DraftBox from "./DraftBox";
import deleteDraft from "@/app/(userpages)/drafts/actions/deleteDraft";
import type { DraftType } from "@/lib/types";

const DraftController = ({ drafts }: { drafts: DraftType[] }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      await deleteDraft(id);
      router.refresh();
    });
  };

  return (
    <DraftBox drafts={drafts} onDelete={handleDelete} isDeleting={isPending} />
  );
};

export default DraftController;
