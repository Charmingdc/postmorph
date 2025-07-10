"use client";

import SectionWrapper from "./SectionWrapper";
import { Button } from "@/components/ui/button";

const DangerZone = () => {
  return (
    <SectionWrapper>
      <h2 className='font-bold text-lg'> Delete Account </h2>

      <form className='flex flex-col gap-2 -mt-3'>
        <p className='text-sm text-muted-foreground mb-1'>
          Deleting your account will erase all data related it and cannot be
          recovered, only proceed if you're actually sure of your action
        </p>
        <Button variant='destructive' type='submit'>
          Delete Account
        </Button>
      </form>
    </SectionWrapper>
  );
};

export default DangerZone;
