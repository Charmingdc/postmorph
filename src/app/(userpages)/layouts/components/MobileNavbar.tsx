"use client";

import { toast } from "sonner";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { CircleUserRound, LayoutDashboard, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import signout from "@/app/auth/actions/signout";

type CleanUser = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
} | null;

const formatPageName = (name: string | undefined) => {
  if (!name) return "";
  return name.replace(/-/g, " ");
};

const MobileNavbar = ({ currentUser }: { currentUser: CleanUser }) => {
  const router = useRouter();
  const pathname: string = usePathname();
  const pageName: string | undefined = pathname
    .split("/")
    .filter(Boolean)
    .pop();

  const handleSignout = async () => {
    try {
      const toastId = toast.loading("Signing out...");
      await signout();
      toast.dismiss(toastId);
      router.push("/auth/signin");
    } catch (err: any) {
      toast.error("Error signing out", {
        description: err.message
      });
    }
  };

  return (
    <nav>
      <ul className='w-full min-h-12 flex items-center justify-between p-4 pt-2'>
        <li className='font-bold text-2xl capitalize'>
          {pageName === "dashboard" && currentUser ? (
            <h2>
              Hey, <br /> {currentUser.name}
            </h2>
          ) : (
            <div className='flex items-center gap-1 pt-3 -mb-2'>
              <h2> {formatPageName(pageName)} </h2>
            </div>
          )}
        </li>
        {currentUser && (
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='w-12 h-12 border border-border rounded-full mr-2 mt-1'>
                  <AvatarImage
                    src={currentUser.avatar_url}
                    alt={currentUser.name}
                  />
                  <AvatarFallback className='text-lg font-bold uppercase'>
                    {currentUser.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className='rounded-xl'>
                <div className='w-ful flex items-center gap-2 pb-2 border-b-2'>
                  <Avatar className='rounded-full'>
                    <AvatarImage
                      src={currentUser.avatar_url}
                      alt={currentUser.name}
                    />
                    <AvatarFallback className='font-bold uppercase'>
                      {currentUser.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className='w-full text-[.8rem]'>
                    <p className='w-full font-bold truncate'>
                      {currentUser.name}
                    </p>
                    <p className='w-full truncate'>{currentUser.email}</p>
                  </div>
                </div>

                <div className='w-full flex flex-col items-center gap-y-2 py-2 border-b-2 my-2'>
                  <Link
                    href='/settings'
                    className='w-full flex items-center gap-2 p-2 rounded-lg hover:bg-card hover:text-primary'
                  >
                    <CircleUserRound size={20} /> Account Settings
                  </Link>
                  <Link
                    href='/dashboard'
                    className='w-full flex items-center gap-2 p-2 rounded-lg hover:bg-card hover:text-primary'
                  >
                    <LayoutDashboard size={20} /> Dashboard
                  </Link>
                </div>

                <button
                  onClick={handleSignout}
                  className='flex items-center gap-2 text-red-600'
                >
                  <LogOut size={20} /> Signout
                </button>
              </PopoverContent>
            </Popover>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
