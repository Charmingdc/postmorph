"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { sidebarRoutes } from "../constants/layoutRoutes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  LayoutDashboard,
  Send,
  ChevronsUpDown,
  CircleUserRound,
  LogOut
} from "lucide-react";

import signout from "@/app/auth/actions/signout";

type CleanUser = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
} | null;

const Sidebar = ({ currentUser }: { currentUser: CleanUser }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pageName = pathname?.split("/").filter(Boolean).pop();

  const handleSignout = async () => {
    try {
      const toastId = toast.loading("Signing out...");
      await signout();
      toast.dismiss(toastId);
      router.push("/auth/signin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error("Error signing out", {
          description: err.message
        });
      } else {
        toast.error("An unknown error as occured");
      }
    }
  };

  return (
    <nav>
      <div className="w-64 h-screen fixed flex flex-col gap-2 p-4 bg-sidebar border-r-2">
        <div className="flex items-center pb-2 border-b-[.080rem] mb-2">
          <Image
            src="/icons/postmorph-logo.png"
            alt="Postmorph Logo"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold">Postmorph</h1>
        </div>

        <Link
          href="/dashboard"
          className="w-[90%] flex items-center bg-primary text-primary-foreground gap-2 p-4 rounded-lg mb-2"
        >
          <LayoutDashboard />
          Dashboard
        </Link>

        {Object.entries(sidebarRoutes).map(([section, routes]) => (
          <div key={section}>
            <h3 className="font-bold capitalize mb-2">
              {section === "aiTools" ? "AI Tools" : section}
            </h3>
            <ul className="flex flex-col gap-y-[.1rem] text-[.9rem] text-muted-foreground border-b-2 mb-2">
              {routes.map(route => {
                const Icon = route.icon;
                const isActive = pageName === route.url.split("/").pop();
                return (
                  <li key={route.url}>
                    <Link
                      href={route.url}
                      className={`${
                        isActive ? "bg-sidebar-border text-foreground" : ""
                      } flex items-center p-3 gap-x-2 rounded-md hover:bg-sidebar-border hover:text-foreground`}
                    >
                      <Icon size={16} />
                      {route.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="w-full mt-auto">
          <button className="flex items-center gap-2">
            <Send size={16} />
            <h3> Feedback </h3>
          </button>

          {currentUser ? (
            <div className="w-[98%] flex items-center bg-sidebar-border px-[3%] gap-2 py-2 rounded-lg mt-4">
              <Avatar>
                <AvatarImage
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="filter grayscale"
                />
                <AvatarFallback className="text-lg font-bold uppercase">
                  {currentUser.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="w-[54%] text-[.8rem]">
                <p className="w-full font-bold truncate">{currentUser.name}</p>
                <p className="w-full truncate">{currentUser.email}</p>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <ChevronsUpDown />
                </PopoverTrigger>

                <PopoverContent className="rounded-xl">
                  <div className="w-ful flex items-center gap-2 pb-2 border-b-2">
                    <Avatar>
                      <AvatarImage
                        src={currentUser.avatar_url}
                        alt={currentUser.name}
                      />
                      <AvatarFallback className="font-bold uppercase">
                        {currentUser.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="w-full text-[.8rem]">
                      <p className="w-full font-bold truncate">
                        {currentUser.name}
                      </p>
                      <p className="w-full truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-y-2 py-2 border-b-2 my-2">
                    <Link
                      href="/dashboard"
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-card hover:text-primary"
                    >
                      <LayoutDashboard size={20} /> Dashboard
                    </Link>

                    <Link
                      href="/settings"
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-card hover:text-primary"
                    >
                      <CircleUserRound size={20} /> Account Settings
                    </Link>
                  </div>

                  <button
                    onClick={handleSignout}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <p className="text-sm mt-4 text-muted-foreground">
              User not available
            </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
