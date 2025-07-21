"use client";

import { useRef } from "react";
import { toast } from "sonner";
import SectionWrapper from "./SectionWrapper";
import { Button } from "@/components/ui/button";

const DangerZone = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const deleteAccount = () => {
    toast.success("Account deleted successfully");
  };

  const confirmBeforeSubmit = () => {
    toast("Are you sure you want to delete your account?", {
      description: "This action cannot be undone.",
      duration: 5000,
      action: (
        <Button
          variant='destructive'
          className='text-sm py-1 px-3'
          onClick={() => {
            toast.dismiss();
            formRef.current?.requestSubmit();
          }}
        >
          Proceed
        </Button>
      )
    });
  };

  return (
    <SectionWrapper>
      <h2 className='font-bold text-lg'>Delete Account</h2>

      <form
        ref={formRef}
        action={deleteAccount}
        className='flex flex-col gap-2 -mt-3'
      >
        <p className='text-sm text-muted-foreground mb-1'>
          Deleting your account will erase all related data and cannot be
          recovered. Only proceed if you're sure.
        </p>

        <Button
          variant='destructive'
          type='button'
          onClick={confirmBeforeSubmit}
        >
          Delete Account
        </Button>
      </form>
    </SectionWrapper>
  );
};

export default DangerZone;
