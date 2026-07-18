"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { link: "#features", text: "Features" },
  { link: "#pricing", text: "Pricing" },
];

const Navbar = () => {
  const router = useRouter();
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsUser(!!user);
    };
    checkAuthStatus();
  }, []);

  return (
    <div className="w-full flex items-center justify-between py-3 px-7 border-b border-[0.5px] border-border bg-background">
      <div className="flex items-center gap-1">
        <Image
          src="/icons/postmorph-logo-variant.png"
          width={36}
          height={36}
          alt="Postmorph Logo"
          priority
        />
        <span className="text-base font-bold">Postmorph</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((navLink, idx) => (
            <Link
              href={navLink.link}
              key={idx}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {navLink.text}
            </Link>
          ))}
        </div>

        {isUser ? (
          <Link href="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
        ) : (
          <Button
            size="sm"
            className="rounded-sm"
            onClick={() => router.push("/auth/signin")}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
