"use client";

import { useEffect, useState, useActionState, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import signup from "@/app/auth/actions/signup";

import GoogleAuthButton from "../ui/GoogleAuthButton";
import Input from "../ui/Input";
import { Button } from "@/components/ui/button";

import type { FormFields } from "@/app/auth/lib/types";
import { inputFields } from "@/app/auth/lib/constants";
import useForm from "@/app/auth/hooks/useForm";

import postmorphUsersConcept from "@/app/auth/assets/illustration-01.png";

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
  const [formCleared, setFormCleared] = useState<boolean>(false);

  useEffect(() => {
    if (!pending) {
      if (!state.message && !formCleared) {
        clearForm();
        setFormCleared(true);
      } else if (state.message) {
        toast.error("Authentication Failed", {
          description: state.message
        });
      }
    }
  }, [pending, state.message, clearForm, formCleared]);

  return (
    <div className='w-screen min-h-screen flex flex-col p-4 pt-10 gap-x-4 md:grid md:grid-cols-2 md:pt-4'>
      <form
        onSubmit={async e => {
          e.preventDefault();
          setFormCleared(false);

          const formData = new FormData();
          formData.append("username", form.username);
          formData.append("email", form.email);
          formData.append("password", form.password);

          startTransition(() => signupAction(formData));
        }}
        className='w-full flex flex-col justify-center p-4 mt-2'
      >
        <h1 className='text-3xl font-bold mb-2'>Get Started</h1>
        <p className='mb-4'>
          Join us and be among top creators that repurpose content faster and
          more efficiently.
        </p>

        <GoogleAuthButton authMode='signup' />

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
          {pending ? "Processing..." : "Sign up"}
        </Button>

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

        <Image
          src={postmorphUsersConcept}
          alt='Postmorph users concept'
          width={postmorphUsersConcept.width}
          height={postmorphUsersConcept.height}
          className='w-full max-w-[90%] h-auto mx-auto'
          priority
        />

        <h3 className='text-xl font-bold text-card-foreground'>
          And others...
        </h3>
      </div>
    </div>
  );
};

export default SignupForm;
