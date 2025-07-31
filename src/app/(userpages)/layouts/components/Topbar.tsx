"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RefreshCw } from "lucide-react";

const formatPageName = (name: string | undefined) => {
  if (!name) return "";
  return name.replace(/-/g, " ");
};

const Topbar = ({ currentUserName }: { currentUserName: string }) => {
  const pathname: string = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const pageName: string | undefined = segments[0];

  return (
    <nav className="w-full">
      <ul className="w-full flex items-center justify-between gap-4 mb-2">
        <li className="capitalize">
          <h2 className="text-2xl font-bold">
            {pageName === "dashboard"
              ? `Welcome back, ${currentUserName}`
              : formatPageName(pageName)}
          </h2>
        </li>
        <li>
          <Link href={pathname} className="p-2 pl-8">
            <RefreshCw
              size={26}
              className="transition-transform duration-300 hover:rotate-180"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
