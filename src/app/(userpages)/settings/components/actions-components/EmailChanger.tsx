"use client";

import { useState, useEffect, useActionState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/client";
import changeEmail from "../../actions/ChangeEmail";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState = { type: "success" as const, message: "" };

const EmailChanger = ({ email: initialEmail }: { email: string }) => {
  const [emailInput, setEmailInput] = useState<string>(initialEmail);

  const [formState, formAction, isPending] = useActionState(
    changeEmail,
    initialState
  );

  useEffect(() => {
    if (!formState.message) return;

    if (formState.type === "error") {
      toast.error(formState.message);
    } else {
      toast.success(formState.message);
      setEmailInput(initialEmail);
    }
  }, [formState, initialEmail]);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) throw new Error(error.message);
      return data.user;
    }
  });

  if (isLoading) return <p>Loading...</p>;

  const usesPassword = user?.identities?.some(i => i.provider === "email");
  const currentEmail = user?.email ?? "";

  return usesPassword ? (
    <form action={formAction} className="w-full flex flex-col gap-2">
      <h2 className="font-bold text-lg">Edit Email</h2>

      <Input
        type="email"
        name="email"
        value={emailInput}
        onChange={e => setEmailInput(e.target.value)}
        className={`${usesPassword ? "" : "hover:border-4"}`}
        disabled={isPending}
      />

      <Button disabled={isPending || currentEmail === emailInput}>
        {isPending ? "Updating..." : "Update"}
      </Button>
    </form>
  ) : (
    <>
      <h2 className="font-bold text-lg">Edit Email</h2>

      <p className="text-sm text-muted-foreground p-3 border rounded-lg -mt-6">
        Since your account is connected via Google, email and password changes
        are managed through your Google account.
      </p>
    </>
  );
};

export default EmailChanger;
