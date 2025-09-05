"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

import { LoadingScreen } from "@/components/ui/loading-screen";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MobileNavbar from "./components/MobileNavbar";
import MobileFooter from "./components/MobileFooter";

type CleanUser = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
};

// Fetch user and return null if no user
const fetchCurrentUser = async (): Promise<CleanUser | null> => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  const user = data.user;

  if (!user) return null;

  return {
    id: user.id,
    name: user.user_metadata?.name || "User",
    email: user.email || "",
    avatar_url: user.user_metadata?.avatar_url || ""
  };
};

const AppClientLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const {
    data: currentUser,
    error,
    isLoading
  } = useQuery<CleanUser | null>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5
  });

  // Redirect if not signed in
  useEffect(() => {
    if (!isLoading && currentUser === null) {
      router.push("/auth/signin");
    }
  }, [isLoading, currentUser, router]);

  // Show error toast if something went wrong
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        description: error.message,
        duration: 5000
      });
    }
  }, [error]);

  return (
    <div className={`w-screen flex ${isMobile ? "flex-col" : "min-h-screen"}`}>
      {isMobile ? (
        <header>
          <MobileNavbar currentUser={currentUser} />
        </header>
      ) : (
        <aside className="w-64">
          <Sidebar currentUser={currentUser} />
        </aside>
      )}

      <main
        className={`min-h-screen p-4 ${
          !isMobile ? "bg-background rounded-lg m-4" : "pb-24"
        } flex-1`}
      >
        {!isMobile && currentUser && (
          <Topbar currentUserName={currentUser.name} />
        )}

        {isLoading && <LoadingScreen />}
        {!isLoading && !error && currentUser && children}
      </main>

      <footer>{isMobile && <MobileFooter />}</footer>
    </div>
  );
};

export default AppClientLayout;
