"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Spinner from "@/components/ui/spinner";

const Page = () => {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying email change...");

  useEffect(() => {
    const confirmEmailChange = async () => {
      try {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const token_hash = hashParams.get("token_hash");
        const type = hashParams.get("type");

        if (!token_hash || type !== "email_change") {
          setStatus("error");
          setMessage("Invalid email verification link.");
          return;
        }

        const supabase = await createClient();

        // Verify the OTP
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash,
          type: "email_change"
        });

        if (verifyError) {
          setStatus("error");
          setMessage("Verification failed.");
          return;
        }

        setStatus("success");
        setMessage("Email successfully updated!, redirecting...");

        // Redirect after success
        setTimeout(() => router.push("/settings"), 2000);
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong.");
      }
    };

    confirmEmailChange();
  }, [router]);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
      {status === "loading" && (
        <div className='flex flex-col items-center justify-center gap-3 text-muted-foreground'>
          <p> {message} </p>
          <Spinner />
        </div>
      )}
      {status === "success" && (
        <p className='text-green-600 font-semibold'>{message}</p>
      )}
      {status === "error" && (
        <p className='text-red-500 font-semibold'>{message}</p>
      )}
    </main>
  );
};

export default Page;
