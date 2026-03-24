import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/landing-page/Navbar";

export default function BlogLayout({
 children
}: {
 children: React.ReactNode;
}) {
 return (
  <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
   {/* Shared Navigation */}
   <nav className="sticky top-0 z-50">
    <Navbar />
   </nav>

   {/* Shared Content Container */}
   <main className="max-w-3xl mx-auto px-4 py-20 md:py-24">
    {children}

    {/* Shared Footer */}
    <footer className="mt-10 pt-6 border-t border-border text-sm text-muted-foreground text-center">
     &copy; {new Date().getFullYear()} Postmorph. All rights reserved.
    </footer>
   </main>
  </div>
 );
}
