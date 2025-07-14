"use client";

import { useState, useEffect, useActionState } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import changeDp from "../actions/changeDp";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  fullName: string;
  avatarUrl?: string | null;
};

const MAX_FILE_SIZE_MB = 2;
const initialState = { type: "success" as const, message: "" };

const AvatarUploader = ({ fullName, avatarUrl }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);

  const [changeDpState, formAction, isPending] = useActionState(
    async (_prev, formData: FormData) => {
      return await changeDp(formData);
    },
    initialState
  );

  useEffect(() => {
    if (!changeDpState.message) return;
    if (changeDpState.type === "error") {
      toast.error(changeDpState.message);
    } else {
      toast.success(changeDpState.message);
      setPreview(null);
      setFilePath(null);
    }
  }, [changeDpState]);

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error("File must be under 2MB");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const supabase = await createClient();
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      toast.error("You must be logged in.");
      return;
    }

    const path = `avatars/${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) {
      console.log("Uploading as user:", user.id);
console.log("Upload path:", path);
      console.log('Bucket error:', uploadError);
      toast.error("Image upload failed.");
      return;
    }

    setFilePath(path);
  };

  const fallback =
    avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName
    )}&background=random&bold=true&size=128`;

  return (
    <form
      className='w-full flex flex-col gap-2'
      action={formAction}
      onSubmit={e => {
        if (!filePath) e.preventDefault();
      }}
    >
      <input
        type='file'
        accept='image/*'
        id='fileSelector'
        onChange={handleSelect}
        className='hidden'
      />

      <h2 className='font-bold text-lg'>Change Avatar</h2>
      <p className='text-sm text-muted-foreground'>
        To change your avatar, click the picture below and select a file to
        upload.
      </p>

      <label
        htmlFor={`${isPending ? "" : "fileSelector"}`}
        className={`cursor-pointer w-fit ${
          isPending && "opacity-50 pointer-events-none"
        }`}
      >
        <Image
          src={preview || fallback}
          width={120}
          height={120}
          alt={`${fullName}'s avatar`}
          className='h-36 rounded-lg object-cover'
        />
      </label>

      {filePath && (
        <>
          <input type='hidden' name='filePath' value={filePath} />
          <Button type='submit' className='mt-2 w-fit' disabled={isPending}>
            {isPending ? "Saving..." : "Save Avatar"}
          </Button>
        </>
      )}
    </form>
  );
};

export default AvatarUploader;
