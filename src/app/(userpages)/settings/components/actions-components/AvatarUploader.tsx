"use client";

import { useState, useEffect, useActionState, startTransition } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import changeDp from "../../actions/changeDp";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { ActionState } from "@/types/index";

type Props = {
  fullName: string;
  avatarUrl?: string | null;
};

const MAX_FILE_SIZE_MB = 4;
const initialState = { type: "success" as const, message: "" };

const AvatarUploader = ({ fullName, avatarUrl }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [changeDpState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(async (_prev, formData: FormData) => {
    return await changeDp(formData);
  }, initialState);

  useEffect(() => {
    if (!changeDpState.message) return;
    if (changeDpState.type === "error") {
      toast.error(changeDpState.message);
    } else {
      toast.success(changeDpState.message);
      setPreview(null);
      setFile(null);
    }
  }, [changeDpState]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`File must be under ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    const supabase = await createClient();
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setIsUploading(false);
      toast.error("You must be logged in.");
      return;
    }

    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) {
      setIsUploading(false);
      toast.error("Image upload failed.");
      return;
    }

    setIsUploading(false);

    const form = new FormData();
    form.append("filePath", path);
    startTransition(() => {
      formAction(form);
    });
  };

  const fallback =
    avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName
    )}&background=random&bold=true&size=128.png`;

  return (
    <form
      className="w-full flex flex-col gap-2 pb-6 border-b-[.060rem]"
      onSubmit={e => e.preventDefault()}
    >
      <input
        type="file"
        accept="image/*"
        id="fileSelector"
        onChange={handleSelect}
        className="hidden"
      />

      <h2 className="font-bold text-lg">Change Avatar</h2>
      <p className="text-sm text-muted-foreground">
        To change your avatar, click the picture below and select a file to
        upload.
      </p>

      <label
        htmlFor={isUploading || isPending ? "" : "fileSelector"}
        className={`cursor-pointer w-fit ${
          isUploading || (isPending && "opacity-50 pointer-events-none")
        }`}
      >
        <Avatar className="w-32 h-32 border border-border rounded-full mt-2">
          <AvatarImage
            src={preview || fallback}
            alt={`${fullName}'s avatar`}
            className="w-32 h-32 object-cover"
          />
          <AvatarFallback className="text-lg font-bold uppercase">
            {fullName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </label>

      {preview && (
        <div className="flex flex-row gap-3 items-center mt-2">
          {!isUploading && !isPending && (
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setPreview(null);
                setFile(null);
                setFilePath(null);
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            type="button"
            className="w-fit"
            disabled={isUploading || isPending}
            onClick={handleUpload}
          >
            {isUploading
              ? "Uploading..."
              : isPending
              ? "Saving..."
              : "Save Avatar"}
          </Button>
        </div>
      )}
    </form>
  );
};

export default AvatarUploader;
