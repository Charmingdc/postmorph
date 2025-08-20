"use client";

import { useState, useEffect, useActionState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/client";
import updatePassword from "@/app/auth/actions/updatePassword";
import type { ActionState } from "@/types/index";

import { Skeleton } from "@/components/ui/skeleton";
import SectionWrapper from "./SectionWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");

  const [changePswState, changePswAction, pendingChange] = useActionState<
    ActionState,
    FormData
  >(updatePassword, { type: "", message: "" });

  useEffect(() => {
    if (!changePswState.message) return;

    if (changePswState.type === "error") {
      toast.error(changePswState.message);
    } else {
      toast.success(changePswState.message);
      setCurrentPassword("");
      setNewPassword("");
    }
  }, [changePswState]);

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
  if (isLoading) return <Skeleton className="h-48 border rounded-lg" />;

  return (
    <SectionWrapper>
      <h2 className="font-bold text-lg"> Password </h2>

      {usesPassword ? (
        <form action={changePswAction} className="flex flex-col gap-2 -mt-3">
          <p className="text-sm text-muted-foreground mb-1">
            To change your password, enter your current and new password in the
            inputs box below and hit Update
          </p>
          <Input
            name="currentPassword"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={!currentPassword || !newPassword || pendingChange}
          >
            {pendingChange ? "Updating..." : "Update"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground p-3 border rounded-lg -mt-4">
          Since your account is connected via Google, email and password changes
          are managed through your Google account.
        </p>
      )}
    </SectionWrapper>
  );
};

export default SecuritySettings;
