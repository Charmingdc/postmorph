"use client";

import { useState } from "react";
import DropdownField from "./DropdownField";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
  Sparkles,
  Link
} from "lucide-react";

const inputFormats = [
  "blog",
  "youtube video",
  "instagram reel",
  "x thread",
  "linkedin post"
] as const;

const formatIcons: Record<string, JSX.Element> = {
  blog: <FileText className='w-4 h-4' />,
  "youtube video": <Youtube className='w-4 h-4' />,
  "instagram reel": <Instagram className='w-4 h-4' />,
  "x thread": <Twitter className='w-4 h-4' />,
  "linkedin post": <Linkedin className='w-4 h-4' />,
  "reddit post": <Link className='w-4 h-4' />,
  tweet: <Twitter className='w-4 h-4' />,
  professional: <Sparkles className='w-4 h-4' />,
  casual: <Sparkles className='w-4 h-4' />,
  funny: <Sparkles className='w-4 h-4' />,
  motivational: <Sparkles className='w-4 h-4' />
};

const outputOptionsMap: Record<(typeof inputFormats)[number], string[]> = {
  blog: ["tweet", "x thread", "linkedin post", "reddit post"],
  "youtube video": ["tweet", "x thread", "linkedin post", "reddit post"],
  "instagram reel": ["tweet", "x thread", "linkedin post", "reddit post"],
  "x thread": ["linkedin post", "reddit post"],
  "linkedin post": ["x thread", "tweet", "reddit post"]
};

const tones = ["professional", "casual", "funny", "motivational"];

const RepurposeForm = () => {
  const [inputFormat, setInputFormat] =
    useState<(typeof inputFormats)[number]>("blog");
  const [outputFormat, setOutputFormat] = useState<string>("tweet");
  const [tone, setTone] = useState<string>("professional");
  const [linkValue, setLinkValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [repurposedResults, setRepurposedResults] = useState<string[]>([]);

  const validOutputFormats = outputOptionsMap[inputFormat];

  const handleSubmit = () => {
    alert(`Repurposing ${inputFormat} to ${outputFormat} in a ${tone} tone`);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setRepurposedResults(["hello", "world"]);
    }, 5000);
  };

  // If outputFormat is invalid for selected inputFormat, reset it
  if (!validOutputFormats.includes(outputFormat)) {
    setOutputFormat(validOutputFormats[0]);
  }

  return (
    <div className='w-full flex flex-col gap-8 items-center bg-card p-4 rounded-xl'>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className='w-full flex flex-col items-center gap-6'
      >
        <div className='w-full flex flex-wrap md:flex-nowrap gap-4'>
          <DropdownField
            label='Input'
            value={inputFormat}
            options={inputFormats as unknown as string[]}
            icon={formatIcons[inputFormat]}
            onChange={value => {
              setInputFormat(value as typeof inputFormat);
              // Reset output format if needed
              if (
                !outputOptionsMap[value as typeof inputFormat].includes(
                  outputFormat
                )
              ) {
                setOutputFormat(
                  outputOptionsMap[value as typeof inputFormat][0]
                );
              }
            }}
          />

          <DropdownField
            label='Output'
            value={outputFormat}
            options={validOutputFormats}
            icon={formatIcons[outputFormat]}
            onChange={setOutputFormat}
          />

          <DropdownField
            label='Tone'
            value={tone}
            options={tones}
            icon={formatIcons[tone]}
            onChange={setTone}
          />
        </div>

        <input
          type='url'
          placeholder={`Paste ${inputFormat} link here`}
          value={linkValue}
          onChange={e => setLinkValue(e.target.value)}
          className='w-full h-14 bg-transparent p-3 border border-border rounded-xl text-sm transition-all duration-500 hover:border-primary'
        />

        <Button
          type='submit'
          className='w-[60%] h-12 p-4 rounded-xl transition-all duration-500 hover:opacity-70'
        >
          Repurpose Now
        </Button>
      </form>

      {loading && (
        <div className='w-full flex flex-col gap-4 items-center mt-10'>
          <h2 className='text-3xl font-bold'> Results </h2>

          <div className='w-full flex flex-col items-center gap-4 md:grid grid-cols-3'>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className='w-full h-80 rounded-2xl' />
            ))}
          </div>
        </div>
      )}

      {repurposedResults.length > 0 && <p> Results done </p>}
    </div>
  );
};

export default RepurposeForm;
