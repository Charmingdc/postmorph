"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavLinks = {
  text: string;
  url: string;
};

const navLinks: NavLinks[] = [
  { text: "Features", url: "#features" },
  { text: "How it Works", url: "#how-it-works" },
  { text: "Pricing", url: "#pricing" },
  { text: "Testimonials", url: "#testimonials" },
  { text: "FAQ", url: "#faq" }
];

const Navbar = () => {
  const router = useRouter();

  const [isUser, setIsUser] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const supabase = createClient();

      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) setIsUser(false);

      setIsUser(true);
    };

    checkAuthStatus();
  }, []);

  return (
    <div className="w-screen flex flex-col items-center justify-center gap-2">
      {/** Navigation Bar **/}
      <div className="w-[90%] top-2 fixed flex items-center justify-between bg-blue-900/10 backdrop-blur-md p-3 rounded-lg z-10 mt-2 mb-2">
        <div className="flex items-center justify-center">
          <Image
            src="/icons/postmorph-logo-variant.png"
            width={40}
            height={40}
            alt="Postmorph Logo"
            className="-ml-2"
            priority
          />

          <h1 className="text-lg font-bold"> Postmorph </h1>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/** menu **/}
      {isMenuOpen && (
        <div className="w-[90%] fixed top-24 flex flex-col justify-center bg-blue-900/10 backdrop-blur-md p-3 gap-4 rounded-lg z-10 md:flex-row  md:items-center md:justify-evenly">
          <ul className="w-full flex flex-col items-start justify-center gap-3">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.url}> {link.text} </Link>
              </li>
            ))}
          </ul>

          {isUser ? (
            <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => router.push("/auth/signin")}
              >
                Sign In
              </Button>
              <Button onClick={() => router.push("/auth/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Navbar;
