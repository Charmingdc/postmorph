"use client";

import Link from "next/link";
import GoogleAuthButton from "../ui/GoogleAuthButton";
import Input from "../ui/Input";
import { Button } from "@/components/ui/button";
import PostmorphWorkflow from "@/app/auth/assets/postmorph-workflow.png";

import useForm from "@/app/auth/hooks/useForm";
import { inputFields } from "@/app/auth/lib/constants";
import type { FormFields } from "@/app/auth/types";

const SignupForm = () => {
    const { form, handleChange, clearForm } = useForm<FormFields>({
        password: "",
        email: ""
    });

    const filteredFields = inputFields.filter(
        field => field.valueKey !== "username"
    );

    const handleSubmit = () => {
        alert("Form submitted");
        clearForm();
    };

    return (
        <div className="w-screen min-h-screen flex flex-col p-4 gap-x-4 md:grid md:grid-cols-2">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="w-full min-h-screen flex flex-col justify-center p-4"
            >
                <h1 className="text-3xl font-bold mb-2"> Welcome back </h1>
                <p className="mb-4"> What are we repurposing today? </p>

                <GoogleAuthButton
                    authMode="signin"
                    onClick={() => alert("hi")}
                />

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-t-2" />
                    <span className="mx-4 text-muted-foreground">
                        {" "}
                        or continue with{" "}
                    </span>
                    <hr className="flex-grow border-t-2" />
                </div>

                {filteredFields.map(
                    ({ label, type, id, placeholder, valueKey }) => (
                        <div key={id} className="mb-2">
                            <label htmlFor={id}>
                                <strong>{label}</strong>
                            </label>
                            <Input
                                inputType={type}
                                id={id}
                                placeholder={placeholder}
                                value={form[valueKey]}
                                onChange={value =>
                                    handleChange(valueKey, value)
                                }
                            />
                        </div>
                    )
                )}

                <Button size="lg" className="h-14 rounded-xl my-2">
                    Sign In
                </Button>

                <p className="w-full text-center">
                    Don't have an account?
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
                    Our simple 4-step process makes content repurposing
                    effortless
                </h2>

                <img
                    src={PostmorphWorkflow}
                    alt="users concepts"
                    className="w-[90%]"
                />

                <h3 className="text-xl text-center font-bold text-card-foreground">
                    Contents repurposing have never being easier.
                </h3>
            </div>
        </div>
    );
};

export default SignupForm;
