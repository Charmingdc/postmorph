"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import googleSignin from "@/app/auth/actions/googleSignin";

type GoogleAuthButtonProps = {
  authMode: "signup" | "signin";
};

const GoogleAuthButton = ({ authMode = "signin" }: GoogleAuthButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const res = await googleSignin();

      if (res?.message) {
        toast.error("Google auth failed", { description: res.message });
      }
    });
  };

  const label = isPending
    ? authMode === "signup"
      ? "Processing..."
      : "Authenticating..."
    : authMode === "signup"
    ? "Signup with Google"
    : "Signin with Google";

  return (
    <button
      onClick={handleClick}
      type='button'
      disabled={isPending}
      className={`w-full flex items-center justify-center font-bold gap-2 py-3 border-[.060rem] rounded-xl my-3 ${
        isPending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <img
        src='/icons/google-icon.png'
        alt='Google Login'
        width='25px'
        height='25px'
      />
      {label}
    </button>
  );
};

export default GoogleAuthButton;
