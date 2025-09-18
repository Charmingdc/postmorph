type FormFields = {
  username?: string;
  email: string;
  password: string;
};

type InputFields = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  valueKey: "username" | "email" | "password";
};

export type { FormFields, InputFields };
