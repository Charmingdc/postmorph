import "@/app/globals.css";
import AppClientLayout from "./layouts/AppClientLayout";
import { QueryProvider } from "./QueryProvider";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <AppClientLayout>{children}</AppClientLayout>
    </QueryProvider>
  );
}
