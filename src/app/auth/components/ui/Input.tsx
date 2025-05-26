'use client';

type InputProps = {
  inputType: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const Input = ({ inputType, id, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type={inputType}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className='w-full h-14 bg-transparent text-foreground font-figtree p-2 border-[.060rem] rounded-xl mt-1 mb-4 transition-all duration-500 focus:border-primary'
    />
  );
};

export default Input;
