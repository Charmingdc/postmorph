"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  inputType: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const Input = ({ inputType, id, placeholder, value, onChange }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='w-full h-14 relative mt-1 mb-4'>
      <input
        type={
          inputType === "password"
            ? showPassword
              ? "text"
              : "password"
            : inputType
        }
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className='w-full h-full bg-transparent text-foreground font-figtree p-2 pr-10 border-[.060rem] rounded-xl transition-all duration-500
        focus:border-primary'
      />

      {inputType === "password" && (
        <button
          type='button'
          onClick={() => setShowPassword(prev => !prev)}
          className='absolute right-4 top-[60%] transform -translate-y-[60%] text-muted-foreground hover:text-primary transition'
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
