"use client";

import { useEffect, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import DropdownField from "./DropdownField";
import InputArea from "./InputArea";
import { Button } from "@/components/ui/button";
import DraftBox from "@/components/drafts/DraftBox";
import { Sparkles, FileText } from "lucide-react";

import type { DraftType, DefaultTone, CustomVoice } from "@/types/index";

import {
  inputFormats,
  outputOptionsMap,
  defaultTones,
  formatIcons
} from "../utils/formatConfig";
import repurpose from "../lib/repurpose";
import deleteDraft from "@/app/(userpages)/drafts/actions/deleteDraft";
import fetchUserCustomVoices from "@/lib/fetchUserCustomVoices";

const RepurposeForm = ({ userId }: { userId: string }) => {
  const [isDeleting, startTransition] = useTransition();

  const [inputFormat, setInputFormat] =
    useState<(typeof inputFormats)[number]>("blog");
  const [outputFormat, setOutputFormat] = useState<string>("tweet");
  const [tone, setTone] = useState<DefaultTone | CustomVoice>(defaultTones[0]);
  const [inputValue, setInputValue] = useState<string>("");
  const [repurposedResult, setRepurposedResult] = useState<DraftType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [userTones, setUserTones] = useState<DefaultTone[] | CustomVoice[]>([
    ...defaultTones
  ]);
  useQuery({
    queryKey: ["tones", userId],
    queryFn: async ({ queryKey }) => {
      const [, userId] = queryKey;
      const customTones = await fetchUserCustomVoices(userId as string);
      setUserTones([...defaultTones, ...customTones]);
      return customTones;
    }
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!inputValue || inputValue.trim() === "") {
        toast.error("Input value is required");
        return;
      }

      if (inputFormat === "instagram reel") {
        toast.warning("Instagram reel not yet supported");
        return;
      }

      const draft = await repurpose(
        inputFormat,
        outputFormat,
        inputValue,
        tone.instruction
      );
      setInputValue("");
      setRepurposedResult([draft]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Error processing request");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteDraft(id);
        setRepurposedResult([]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error("Error deleting generated draft");
        }
      }
    });
  };

  const validOutputFormats = outputOptionsMap[inputFormat];
  useEffect(() => {
    if (!validOutputFormats.includes(outputFormat)) {
      setOutputFormat(validOutputFormats[0]);
    }
  }, [inputFormat, outputFormat, validOutputFormats]);

  return (
    <>
      <div className="w-full flex flex-col gap-8 items-center bg-card p-4 rounded-xl mb-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full flex flex-col items-center gap-6"
        >
          <div className="w-full flex flex-wrap md:flex-nowrap gap-4">
            <DropdownField
              label="Input"
              value={inputFormat}
              options={inputFormats as unknown as string[]}
              icon={
                formatIcons[inputFormat] || <FileText className="w-4 h-4" />
              }
              onChange={value => setInputFormat(value as typeof inputFormat)}
            />

            <DropdownField
              label="Output"
              value={outputFormat}
              options={validOutputFormats}
              icon={
                formatIcons[outputFormat] || <FileText className="w-4 h-4" />
              }
              onChange={setOutputFormat}
            />

            <DropdownField
              label="Tone"
              value={tone}
              options={userTones}
              icon={formatIcons[tone] || <Sparkles className="w-4 h-4" />}
              onChange={setTone}
            />
          </div>

          <InputArea
            inputFormat={inputFormat}
            value={inputValue}
            onChange={setInputValue}
            disabled={loading}
          />

          <Button
            type="submit"
            className={`w-[60%] h-12 p-4 rounded-xl transition-all duration-500 ${
              loading ? "opacity-40" : ""
            }`}
          >
            {loading ? "Transforming..." : "Repurpose Now"}
          </Button>
        </form>
      </div>

      {repurposedResult.length > 0 && (
        <DraftBox
          drafts={repurposedResult}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default RepurposeForm;
