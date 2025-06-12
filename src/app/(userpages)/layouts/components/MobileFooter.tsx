"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerRoutes } from "../constants/layoutRoutes";

const MobileFooter = () => {
  const pathname = usePathname();

  return (
    <nav
      className='w-full min-h-20 fixed bottom-0 flex items-center
    justify-center bg-sidebar py-2 px-4 border-t border-border rounded-t-3xl
    z-48'
    >
      <div className='w-full relative'>
        <div className='flex justify-around items-center'>
          {footerRoutes.map(route => {
            const Icon = route.icon;
            const isActive = pathname === route.url;
            const isRepurpose = route.url === "/repurpose";

            // Keep placeholder in flex row to preserve spacing
            if (isRepurpose) {
              return (
                <div key='repurpose-placeholder' className='w-12 h-0'></div>
              );
            }

            return (
              <Link
                key={route.url}
                href={route.url}
                className={`w-12 flex flex-col items-center gap-y-1 text-xs ${
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-foreground"
                }`}
              >
                <Icon size={24} />
                {route.text}
              </Link>
            );
          })}
        </div>

        {/* Pop-out repurpose button */}
        {footerRoutes.map(route => {
          if (route.url !== "/repurpose") return null;
          const Icon = route.icon;

          return (
            <Link
              key={route.url}
              href={route.url}
              className='absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-primary text-primary-foreground p-4 border-8 border-accent rounded-full shadow-md z-50'
            >
              <Icon size={28} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileFooter;
