"use client";

import { useState } from "react";
import DropdownField from "./DropdownField";
import InputArea from "./InputArea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  inputFormats,
  outputOptionsMap,
  tones,
  formatIcons
} from "../utils/formatConfig";

const RepurposeForm = () => {
  const [inputFormat, setInputFormat] =
    useState<(typeof inputFormats)[number]>("blog");
  const [outputFormat, setOutputFormat] = useState("tweet");
  const [tone, setTone] = useState("professional");
  const [linkValue, setLinkValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [repurposedResults, setRepurposedResults] = useState<string[]>([]);

  const validOutputFormats = outputOptionsMap[inputFormat];
  if (!validOutputFormats.includes(outputFormat)) {
    setOutputFormat(validOutputFormats[0]);
  }

  const handleSubmit = () => {
    alert(`Repurposing ${inputFormat} to ${outputFormat} in a ${tone} tone`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRepurposedResults(["hello", "world"]);
    }, 5000);
  };

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
            onChange={value => setInputFormat(value as typeof inputFormat)}
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

        <InputArea
          inputFormat={inputFormat}
          value={linkValue}
          onChange={setLinkValue}
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

      {repurposedResults.length > 0 && <p>Results done</p>}
    </div>
  );
};

export default RepurposeForm;
