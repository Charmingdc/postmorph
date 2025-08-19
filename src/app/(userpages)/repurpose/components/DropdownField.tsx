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

interface DropdownFieldProps {
  label: string;
  value: string;
  options: string[];
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
          {value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map(option => (
            <DropdownMenuRadioItem
              key={option?.name || option}
              value={option?.name || option}
              className="capitalize"
            >
              {option?.name || option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default DropdownField;
