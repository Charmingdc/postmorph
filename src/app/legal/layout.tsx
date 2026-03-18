import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function LegalLayout({
 children
}: {
 children: React.ReactNode;
}) {
 return (
  <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
   {/* Shared Navigation */}
   <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
     <Link
      href="/"
      className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
     >
      <ChevronLeft className="w-4 h-4 mr-1" />
      Back to Home
     </Link>
    </div>
   </nav>

   {/* Shared Content Container */}
   <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
    {children}

    {/* Shared Footer */}
    <footer className="mt-24 pt-8 border-t border-border text-sm text-muted-foreground text-center">
     &copy; {new Date().getFullYear()} Postmorph. All rights reserved.
    </footer>
   </main>
  </div>
 );
}
