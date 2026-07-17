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

      if (!user) {
        setIsUser(false);
      } else {
        setIsUser(true);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div className="w-full flex items-center justify-between py-3 px-7 border-b border-[0.5px] border-border -ml-2">
      <div className="flex items-center justify-center">
        <Image
          src="/icons/postmorph-logo-variant.png"
          width={40}
          height={40}
          alt="Postmorph Logo"
          priority
        />

        <h1 className="text-lg font-extrabold"> Postmorph </h1>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="hidden md:flex items-center justify-center gap-2">
          {navLinks.map((navLink, idx) => (
            <Link
              href={navLink.link}
              key={idx}
              className="text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              {navLink.text}
            </Link>
          ))}
        </div>

        {isUser ? (
          <Link href="/dashboard"> Dashboard </Link>
        ) : (
          <Button onClick={() => router.push("/auth/signin")}> Sign In </Button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
