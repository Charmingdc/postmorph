import { useState } from 'react';

const useForm = <T extends Record<string, string>>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (field: keyof T, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => setForm(initialState);

  return { form, handleChange, clearForm };
};

export default useForm;
