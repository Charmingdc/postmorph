"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Profile } from "@/types/index";

const GeneralSettings = ({ profileDetails }: { profileDetails: Profile }) => {
  const { full_name, avatar_url, email } = profileDetails;

  const [fullName, setFullName] = useState<string>(full_name);
  const [emailValue, setEmailValue] = useState<string>(email);

  return (
    <SectionWrapper>
      {/** User avatar section **/}
      <div className='w-full flex flex-col gap-2'>
        <h2 className='font-bold text-lg'> Change Avatar </h2>

        <p className='text-sm text-muted-foreground'>
          To change your avatar, click the picture below and select a file to
          upload
        </p>

        <Image
          src={avatar_url}
          width='120'
          height='120'
          alt={`${full_name}'s avatar`}
          className='h-36 rounded-lg'
        />
      </div>

      {/** user full name section **/}
      <div className='w-full flex flex-col gap-2'>
        <h2 className='font-bold text-lg'> Edit Full Name </h2>
        <p className='text-sm text-muted-foreground'>
          To change your name, enter your preferred name in the input below and
          click on update
        </p>

        <Input
          type='text'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />

        <Button disabled={full_name === fullName}> Update </Button>
      </div>

      {/** user email section **/}
      <div className='w-full flex flex-col gap-2'>
        <h2 className='font-bold text-lg'> Edit Email </h2>
        <p className='text-sm text-muted-foreground'>
          To change your email, enter the new email in the input below and click
          on update. You will have to verify the new email before it becomes
          active
        </p>

        <Input
          type='email'
          value={emailValue}
          onChange={e => setEmailValue(e.target.value)}
        />

        <Button disabled={email === emailValue}> Update </Button>
      </div>
    </SectionWrapper>
  );
};

export default GeneralSettings;
