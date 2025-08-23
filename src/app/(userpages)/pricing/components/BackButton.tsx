"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  
  return (
    <Button
      className="w-fit bg-secondary text-secondary-foreground p-3 mb-2"
      onClick={() => router.back()}
    >
      <ChevronLeft /> Go Back
    </Button>
  );
};

export default BackButton;
