"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ConfirmedButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/dashboard")} className='py-6 my-4'>
      Email Confirmed
    </Button>
  );
};

export default ConfirmedButton;
