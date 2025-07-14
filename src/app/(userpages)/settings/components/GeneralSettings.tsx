"use client";

import { useState } from "react";

import SectionWrapper from "./SectionWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AvatarUploader from "./AvatarUploader";

import type { Profile } from "@/types/index";

const GeneralSettings = ({ profileDetails }: { profileDetails: Profile }) => {
  const { full_name, avatar_url, email } = profileDetails;

  const [fullName, setFullName] = useState<string>(full_name);
  const [emailValue, setEmailValue] = useState<string>(email);

  return (
    <SectionWrapper>
      {/* Avatar Uploader Component */}
      <AvatarUploader fullName={full_name} avatarUrl={avatar_url} />

      {/* Full name update */}
      <form className='w-full flex flex-col gap-2'>
        <h2 className='font-bold text-lg'>Edit Full Name</h2>
        <p className='text-sm text-muted-foreground'>
          To change your name, enter the new name in the input below and hit
          Update
        </p>
        <Input
          type='text'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <Button disabled={full_name === fullName}>Update</Button>
      </form>

      {/* Email update */}
      <form className='w-full flex flex-col gap-2'>
        <h2 className='font-bold text-lg'>Edit Email</h2>
        <p className='text-sm text-muted-foreground'>
          To change your email address, enter the new email in the input below
          and hit Update
        </p>
        <Input
          type='email'
          value={emailValue}
          onChange={e => setEmailValue(e.target.value)}
        />
        <Button disabled={email === emailValue}>Update</Button>
      </form>
    </SectionWrapper>
  );
};

export default GeneralSettings;
