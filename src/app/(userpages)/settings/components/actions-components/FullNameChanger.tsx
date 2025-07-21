"use client";

import { useState, useEffect, useActionState } from "react";
import { toast } from "sonner";
import changeFullname from "../../actions/changeFullname";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { ActionState } from "@/types/index";
const initialState = { type: "success" as const, message: "" };

const FullNameChanger = ({ fullName }: { fullName: string }) => {
  const [fullNameInput, setFullNameInput] = useState<string>(fullName);

  const [formState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(changeFullname, initialState);

  useEffect(() => {
    if (!formState.message) return;
    if (formState.type === "error") {
      toast.error(formState.message);
    } else {
      toast.success(formState.message);
      setFullNameInput(fullName);
    }
  }, [fullName, formState]);

  return (
    <form action={formAction} className='w-full flex flex-col gap-2'>
      <h2 className='font-bold text-lg'>Edit Full Name</h2>

      <Input
        type='text'
        name='fullname'
        value={fullNameInput}
        onChange={e => setFullNameInput(e.target.value)}
        disabled={isPending}
      />
      <Button disabled={isPending || fullName === fullNameInput}>
        {isPending ? "Updating" : "Update"}
      </Button>
    </form>
  );
};

export default FullNameChanger;
