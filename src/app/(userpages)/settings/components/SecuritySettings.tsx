"use client";

import { useState, useActionState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/client";
import changePassword from "../actions/changePassword";
import type { ActionState } from "@/types/index";

import SectionWrapper from "./SectionWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sendPasswordReset = async () => {};
const SecuritySettings = () => {
  const [newPassword, setNewPassword] = useState("");

  const [changePswState, changePswAction, pendingChange] = useActionState<
    ActionState,
    FormData
  >(changePassword, { type: "", message: "" });

  const [resetState, resetPasswordAction, pendingReset] = useActionState<
    ActionState,
    FormData
  >(sendPasswordReset, { type: "", message: "" });

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) throw new Error(error.message);
      return data.user;
    }
  });

  const usesPassword = user?.identities?.some(i => i.provider === "email");
  const email = user?.email ?? "";

  if (isLoading) return <p>Loading...</p>;

  return (
    <SectionWrapper>
      <h2 className='font-bold text-lg'> Password </h2>

      {!usesPassword ? (
        <form action={changePswAction} className='flex flex-col gap-2 -mt-3'>
          <p className='text-sm text-muted-foreground mb-1'>
            To change your password, enter the new password in the input below
            and hit Update
          </p>
          <Input
            name='newPassword'
            type='password'
            placeholder='Enter new password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <Button type='submit' disabled={!newPassword || pendingChange}>
            {pendingChange ? "Updating..." : "Update"}
          </Button>
        </form>
      ) : (
        <form
          action={resetPasswordAction}
          className='flex flex-col gap-2 -mt-3'
        >
          <input type='hidden' name='email' value={email} />
          <p className='text-sm text-muted-foreground mb-1'>
            You signed in with Google or another provider. Click the button
            below to add a password to your account:
          </p>
          <Button type='submit' disabled={pendingReset}>
            {pendingReset ? "Sending..." : "Create a Password"}
          </Button>
        </form>
      )}

      {changePswState.message &&
        toast[changePswState.type === "error" ? "error" : "success"](
          changePswState.message
        )}

      {resetState.message &&
        toast[resetState.type === "error" ? "error" : "success"](
          resetState.message
        )}
    </SectionWrapper>
  );
};

export default SecuritySettings;
