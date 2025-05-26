import type { InputFields } from './types.ts';

export const inputFields: InputFields[] = [
  {
    label: 'Username',
    type: 'text',
    id: 'username-input',
    placeholder: 'Enter your preferred username',
    valueKey: 'username'
  },
  {
    label: 'Email',
    type: 'email',
    id: 'email-input',
    placeholder: 'Enter an email',
    valueKey: 'email'
  },
  {
    label: 'Password',
    type: 'password',
    id: 'password-input',
    placeholder: 'Enter a strong password',
    valueKey: 'password'
  }
];