"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type ConfirmDeleteOptions = {
  message?: string;
  description?: string;
};

const useConfirmDelete = (
  onConfirm: () => void,
  options?: ConfirmDeleteOptions
): [boolean, () => void] => {
  const [deleting, setDeleting] = useState(false);

  const confirm = () => {
    toast(options?.message || "Are you sure you want to delete?", {
      description: options?.description,
      duration: 5000,
      action: (
        <Button
          variant="destructive"
          className="text-sm py-1 px-3"
          onClick={() => {
            toast.dismiss();
            setDeleting(true);
            onConfirm();
          }}
        >
          Proceed
        </Button>
      )
    });
  };

  return [deleting, confirm];
};

export default useConfirmDelete;
