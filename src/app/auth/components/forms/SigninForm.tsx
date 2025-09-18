"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useActionState, startTransition } from "react";
import { toast } from "sonner";

import signin from "@/app/auth/actions/signin";
import GoogleAuthButton from "../ui/GoogleAuthButton";
import Input from "../ui/Input";
import { Button } from "@/components/ui/button";

import type { FormFields } from "@/app/auth/lib/types";
import { inputFields } from "@/app/auth/lib/constants";
import useForm from "@/app/auth/hooks/useForm";

import postmorphWorkflow from "@/app/auth/assets/postmorph-workflow.png";

const SigninForm = () => {
  const { form, handleChange, clearForm } = useForm<FormFields>({
    password: "",
    email: ""
  });

  const [state, signinAction, pending] = useActionState(signin, {
    message: ""
  });
  const [formCleared, setFormCleared] = useState<boolean>(false);

  const filteredFields = inputFields.filter(
    field => field.valueKey !== "username"
  );

  useEffect(() => {
    if (!pending) {
      if (!state.message && !formCleared) {
        clearForm();
        setFormCleared(true);
      } else if (state.message && !formCleared) {
        toast.error("Authentication Failed", {
          description: state.message
        });
        setFormCleared(true);
      }
    }
  }, [pending, state.message, clearForm, formCleared]);

  return (
    <div className="w-screen min-h-screen flex flex-col p-4 gap-x-4 md:grid md:grid-cols-2">
      <form
        onSubmit={async e => {
          e.preventDefault();
          setFormCleared(false);

          const formData = new FormData();
          formData.append("email", form.email);
          formData.append("password", form.password);

          startTransition(() => {
            signinAction(formData);
          });
        }}
        className="w-full min-h-screen flex flex-col justify-center p-4"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="mb-4">What are we repurposing today?</p>

        <GoogleAuthButton authMode="signin" />

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t-2" />
          <span className="mx-4 text-muted-foreground">or continue with</span>
          <hr className="flex-grow border-t-2" />
        </div>

        {filteredFields.map(({ label, type, id, placeholder, valueKey }) => (
          <div key={id} className="mb-2">
            <label htmlFor={id}>
              <strong>{label}</strong>
            </label>
            <Input
              inputType={type}
              id={id}
              placeholder={placeholder}
              value={form[valueKey] ?? ""}
              onChange={value => handleChange(valueKey, value)}
            />
          </div>
        ))}

        <Button
          size="lg"
          className="h-14 rounded-xl my-2"
          type="submit"
          disabled={pending}
        >
          {pending ? "Authenticating..." : "Sign In"}
        </Button>

        <p className="w-full text-center">
          {`Don't have an account?`}
          <Link
            href="/auth/signup"
            className="text-primary ml-1 underline-offset-2 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>

      <div className="hidden w-full flex-col items-center justify-center gap-2 bg-card p-4 pb-0 rounded-2xl md:flex">
        <h2 className="text-3xl font-bold text-center text-card-foreground mb-2">
          Our simple 4-step process makes content repurposing effortless
        </h2>

        <Image
          src={postmorphWorkflow}
          alt="Postmorph workflow"
          width={postmorphWorkflow.width}
          height={postmorphWorkflow.height}
          className="w-full max-w-[90%] h-auto mx-auto"
          priority
        />

        <h3 className="text-xl text-center font-bold text-card-foreground">
          Content repurposing has never been easier.
        </h3>
      </div>
    </div>
  );
};

export default SigninForm;
