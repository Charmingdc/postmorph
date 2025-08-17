"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import DropdownField from "./DropdownField";
import InputArea from "./InputArea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DraftBox from "@/components/drafts/DraftBox";
import { Sparkles, FileText } from "lucide-react";

import type { DraftType } from "@/types/index";

import {
  inputFormats,
  outputOptionsMap,
  defaultTones,
  formatIcons
} from "../utils/formatConfig";
import repurpose from "../lib/repurpose";
import fetchUserCustomVoices from "@/lib/fetchUserCustomVoices";

const RepurposeForm = ({ userId }: { userId: string }) => {
  const [inputFormat, setInputFormat] =
    useState<(typeof inputFormats)[number]>("blog");
  const [outputFormat, setOutputFormat] = useState<string>("tweet");
  const [tone, setTone] = useState<string>("professional");
  const [inputValue, setInputValue] = useState<string>("");
  const [repurposedResult, setRepurposedResult] = useState<DraftType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [customTones, setCustomTones] = useState<string[]>([...defaultTones]);

  const { data: userTones } = useQuery({
    queryKey: ["tones"],
    enabled: !!userId,
    queryFn: () => fetchUserCustomVoices(),
    onSucess: () => setCustomTones(...defaultTones, ...userTones)
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const draft = await repurpose(
        inputFormat,
        outputFormat,
        inputValue,
        tone
      );
      setInputValue("");
      setRepurposedResult([draft]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
        console.log(err)
      } else {
        toast.error("Error processing request");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {};

  const validOutputFormats = outputOptionsMap[inputFormat];
  useEffect(() => {
    if (!validOutputFormats.includes(outputFormat)) {
      setOutputFormat(validOutputFormats[0]);
    }
  }, [inputFormat, outputFormat, validOutputFormats]);

  return (
    <>
      <div className="w-full flex flex-col gap-8 items-center bg-card p-4 rounded-xl">
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
              options={customTones}
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
            className="w-[60%] h-12 p-4 rounded-xl transition-all duration-500 hover:opacity-70"
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
