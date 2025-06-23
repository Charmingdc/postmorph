"use client";

import { useRef } from "react";
import useAutoGrowTextarea from "../hooks/useAutoGrowTextarea";

type Props = {
  inputFormat: string;
  value: string;
  onChange: (val: string) => void;
};

const InputArea = ({ inputFormat, value, onChange }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useAutoGrowTextarea(textareaRef, value);

  const isLinkInput =
    inputFormat === "youtube video" || inputFormat === "instagram reel";

  if (isLinkInput) {
    return (
      <input
        type='url'
        placeholder={`Paste ${inputFormat} link here`}
        value={value}
        onChange={e => onChange(e.target.value)}
        className='w-full h-14 bg-transparent p-3 border border-border rounded-xl text-sm transition-all duration-500 hover:border-primary'
      />
    );
  }

  return (
    <textarea
      ref={textareaRef}
      placeholder={`Paste ${inputFormat} content here`}
      value={value}
      onChange={e => onChange(e.target.value)}
      className='w-full min-h-[3.5rem] bg-transparent p-3 border border-border rounded-xl text-sm transition-all duration-500 hover:border-primary resize-none overflow-hidden'
    />
  );
};

export default InputArea;
