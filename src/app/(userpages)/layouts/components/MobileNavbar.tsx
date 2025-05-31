"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  AlignStartVertical,
  Send,
  CircleUserRound,
  Bell,
  LogOut
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import signout from "@/app/auth/actions/signout";

const formatPageName = (name: string | undefined) => {
  if (!name) return "";
  return name.replace(/-/g, " ");
};

const MobileNavbar = () => {
  const router = useRouter();
  const pathname: string = usePathname();
  const pageName: string | undefined = pathname
    .split("/")
    .filter(Boolean)
    .pop();

  const handleSignout = async () => {
    try {
      const toastId = toast.loading("Signing out....");

      await signout();

      toast.dismiss(toastId);
      router.push("/auth/signin");
    } catch (err) {
      toast.error("An error occured when logging user out:", {
        description: err.message
      });
    }
  };

  return (
    <nav>
      <ul className='w-full min-h-12 flex items-center justify-between p-4 pt-2'>
        <li className='font-bold text-2xl capitalize'>
          {pageName === "dashboard" ? (
            <h2>
              Hey, <br /> Charmingdc
            </h2>
          ) : (
            <div className='flex items-center gap-1 pt-3 -mb-2'>
              <h2> {formatPageName(pageName)} </h2>
            </div>
          )}
        </li>
        {pageName === "dashboard" && (
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='w-12 h-12 border-2 border-primary rounded-full mr-2 mt-1'>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className='rounded-xl'>
                <div className='w-ful flex items-center gap-2 pb-2 border-b-2'>
                  <Avatar className='rounded-full'>
                    <AvatarImage
                      src='https://github.com/shadcn.png'
                      alt='@shadcn'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className='w-full text-[.8rem]'>
                    <p className='w-full font-bold truncate'> Charmingdc </p>
                    <p className='w-full truncate'> charmingdc002@gmail.com </p>
                  </div>
                </div>

                <div className='w-full flex flex-col items-center gap-y-2 py-2 border-b-2 my-2'>
                  <Link
                    href=''
                    className='w-full flex items-center gap-2 p-2 rounded-lg hover:bg-card hover:text-primary'
                  >
                    <CircleUserRound size={20} /> Account
                  </Link>
                  <Link
                    href=''
                    className='w-full flex items-center gap-2 p-2 rounded-lg hover:bg-card hover:text-primary'
                  >
                    <Bell size={20} /> Notifications
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
