"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import type { CustomVoice } from "@/types/index";
interface DropdownFieldProps {
  label: string;
  value: string | CustomVoice;
  options: string[] | CustomVoice[];
  icon?: React.ReactNode;
  onChange: (value: string) => void;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  value,
  options,
  icon,
  onChange
}) => (
  <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
    <label className="label text-sm font-medium">{label}</label>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full capitalize flex items-center justify-start"
        >
          {icon && <span className="mr-2">{icon}</span>}
          {typeof value === string ? value : value?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map(option => (
            <DropdownMenuRadioItem
              key={typeof option === "string" ? option : option.name}
              value={option}
              className="capitalize"
            >
              {typeof option === "string" ? option : option.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default DropdownField;
