"use client";

import { useRef } from "react";
import deleteAccount from "../actions/deleteAccount";

import SectionWrapper from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading-screen";
import useConfirmDelete from "@/app/hooks/useConfirmDelete";

const DangerZone = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [deleting, confirmBeforeSubmit] = useConfirmDelete(
    () => {
      formRef.current?.requestSubmit();
    },
    {
      message: "Are you sure you want to delete your account?",
      description: "This action cannot be undone."
    }
  );

  return (
    <SectionWrapper>
      <h2 className="font-bold text-lg">Delete Account</h2>

      <form
        ref={formRef}
        action={deleteAccount}
        className="flex flex-col gap-2 -mt-3"
      >
        <p className="text-sm text-muted-foreground mb-1">
          {`Deleting your account will erase all related data and cannot be
          recovered. Only proceed if you're sure.`}
        </p>

        <Button
          variant="destructive"
          type="button"
          onClick={confirmBeforeSubmit}
        >
          Delete Account
        </Button>
      </form>

      {deleting && <LoadingScreen />}
    </SectionWrapper>
  );
};

export default DangerZone;
