import '@/app/globals.css';
import AppClientLayout from './layouts/AppClientLayout';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppClientLayout> {children} </AppClientLayout>;
}
