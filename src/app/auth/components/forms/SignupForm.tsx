"use client";

import { useActionState, startTransition } from "react";
import Link from "next/link";
import signup from "@/app/auth/actions/signup";

import GoogleAuthButton from "../ui/GoogleAuthButton";
import Input from "../ui/Input";
import { Button } from "@/components/ui/button";
import UsersConcepts from "@/app/auth/assets/illustration-01.png";

import useForm from "@/app/auth/hooks/useForm";
import { inputFields } from "@/app/auth/lib/constants";
import type { FormFields } from "@/app/auth/lib/types";

type SignupState = { message: string };

const SignupForm = () => {
  const { form, handleChange, clearForm } = useForm<FormFields>({
    username: "",
    password: "",
    email: ""
  });

  const [state, signupAction, pending]: [
    SignupState,
    (formData: FormData) => Promise<SignupState>,
    boolean
  ] = useActionState(signup, {
    message: ""
  });

  return (
    <div className='w-screen min-h-screen flex flex-col p-4 pt-10 gap-x-4 md:grid md:grid-cols-2 md:pt-4'>
      <form
        onSubmit={async e => {
          e.preventDefault();

          const formData = new FormData();
          formData.append("email", form.email);
          formData.append("password", form.password);

          startTransition(() => signupAction(formData));

          if (!state.message) clearForm();
        }}
        className='w-full flex flex-col justify-center p-4 mt-2'
      >
        <h1 className='text-3xl font-bold mb-2'>Get Started</h1>
        <p className='mb-4'>
          Join us and be among top creators that repurpose content faster and
          more efficiently.
        </p>

        <GoogleAuthButton authMode='signup' onClick={() => alert("hi")} />

        <div className='flex items-center my-4'>
          <hr className='flex-grow border-t-2' />
          <span className='mx-4 text-muted-foreground'>or continue with</span>
          <hr className='flex-grow border-t-2' />
        </div>

        {inputFields.map(({ label, type, id, placeholder, valueKey }) => (
          <div key={id} className='mb-2'>
            <label htmlFor={id}>
              <strong>{label}</strong>
            </label>
            <Input
              inputType={type}
              id={id}
              placeholder={placeholder}
              value={form[valueKey]}
              onChange={value => handleChange(valueKey, value)}
            />
          </div>
        ))}

        <Button
          size='lg'
          className='h-14 rounded-xl my-2'
          type='submit'
          disabled={pending}
        >
          {pending ? "Signing up..." : "Sign up"}
        </Button>

        {state?.message && <p className='mt-2 text-red-600'>{state.message}</p>}

        <p className='w-full text-center'>
          Already have an account?
          <Link
            href='/auth/signin'
            className='text-primary ml-1 underline-offset-2 hover:underline'
          >
            Sign In
          </Link>
        </p>
      </form>

      <div className='hidden w-full flex-col items-center justify-center gap-2 bg-card p-4 pb-0 rounded-2xl md:flex'>
        <h2 className='text-3xl font-bold text-card-foreground mb-2'>
          Built for modern creators
        </h2>

        <img src={UsersConcepts} alt='users concepts' className='w-[90%]' />

        <h3 className='text-xl font-bold text-card-foreground'>
          And others...
        </h3>
      </div>
    </div>
  );
};

export default SignupForm;
