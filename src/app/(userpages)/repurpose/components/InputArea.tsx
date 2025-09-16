"use client";

import { useRef } from "react";
import useAutoGrowTextarea from "../hooks/useAutoGrowTextarea";

type Props = {
  inputFormat: string;
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
};

const InputArea = ({ inputFormat, value, onChange, disabled }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutoGrowTextarea(textareaRef, value);

  const isLinkInput =
    inputFormat === "youtube video" || inputFormat === "tiktok video";

  if (isLinkInput) {
    return (
      <input
        type="url"
        placeholder={`Paste ${inputFormat} link here`}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full h-14 bg-transparent p-3 border border-border rounded-xl text-sm transition-all duration-500 hover:border-primary
        ${disabled ? "opacity-50" : ""}`}
      />
    );
  }

  return (
    <textarea
      ref={textareaRef}
      placeholder={`${
        inputFormat === "blog"
          ? "Paste blog link or content here"
          : `Paste ${inputFormat} content here`
      }`}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full min-h-[3.5rem] bg-transparent p-3 border border-border rounded-xl text-sm transition-all duration-500 hover:border-primary resize-none overflow-hidden ${
        disabled ? "opacity-50" : ""
      }`}
    />
  );
};

export default InputArea;
