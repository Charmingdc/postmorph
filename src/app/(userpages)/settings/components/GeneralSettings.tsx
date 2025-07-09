"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

import type { Profile } from "@/types/index";

const GeneralSettings = ({ profileDetails }: { profileDetails: Profile }) => {
  const { full_name, avatar_url, email } = profileDetails;

  const [emailValue, setEmailValue] = useState<string>(email);

  return (
    <SectionWrapper>
      <div className='w-full flex flex-col gap-2'>
        <h2 className='font-bold text-lg'> Change Avatar </h2>

        <p className='text-sm text-muted-foreground'>
          To change your avatar, click the picture below and select a file to
          upload
        </p>

        <Image
          src={avatar_url}
          width='100'
          height='120'
          alt={`${full_name}'s avatar`}
          className='h-32 rounded-lg'
        />
      </div>

      <div className='w-full flex flex-col gap-2'>
        <h2 className='font-bold text-lg'> Edit Email </h2>

        <Input
          type='email'
          value={emailValue}
          onChange={e => setEmailValue(e.target.value)}
        />

        <Button disabled={email === emailValue}> Save </Button>
      </div>
    </SectionWrapper>
  );
};

export default GeneralSettings;
