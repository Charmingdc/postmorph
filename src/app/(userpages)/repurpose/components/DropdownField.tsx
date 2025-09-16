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

import type { DefaultTone as DefaultVoice, CustomVoice } from "@/types/index";

interface DropdownFieldProps<T extends string | DefaultVoice | CustomVoice> {
  label: string;
  value: T;
  options: T[];
  icon?: React.ReactNode;
  onChange: (value: T) => void;
}

const DropdownField = <T extends string | DefaultVoice | CustomVoice>({
  label,
  value,
  options,
  icon,
  onChange
}: DropdownFieldProps<T>) => {
  const serialize = (val: T) => (typeof val === "string" ? val : val.id);

  const deserialize = (val: string): T => {
    const match = options.find(opt =>
      typeof opt === "string" ? opt === val : opt.id === val
    );
    return match as T;
  };

  return (
    <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
      <label className="label text-sm font-medium">{label}</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full capitalize flex items-center justify-start"
          >
            {icon && <span className="mr-2">{icon}</span>}
            {typeof value === "string" ? value : value.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={serialize(value)}
            onValueChange={val => onChange(deserialize(val))}
          >
            {options.map((option, idx) => {
              const strVal = serialize(option);
              const displayLabel =
                typeof option === "string" ? option : option.name;

              return (
                <DropdownMenuRadioItem
                  key={strVal ?? `opt-${idx}`}
                  value={strVal}
                  className="capitalize"
                >
                  {displayLabel}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownField;
