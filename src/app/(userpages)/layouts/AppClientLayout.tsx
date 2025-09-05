"use client";

import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";

type CleanUser = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
} | null;

const AppClientLayout = ({
  children,
  currentUser
}: {
  children: ReactNode;
  currentUser: CleanUser;
}) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="flex w-full min-h-screen">
      {isMobile ? (
        <header>
          <MobileNavbar currentUser={currentUser || null} />
        </header>
      ) : (
        <aside className="w-64">
          <Sidebar currentUser={currentUser || null} />
        </aside>
      )}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AppClientLayout;
