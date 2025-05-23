import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { layoutRoutes as navbarRoutes } from '../constants/layoutRoutes';

import {
  Menu,
  LayoutDashboard,
  Send,
  CircleUserRound,
  Bell,
  LogOut
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const pathname: string = usePathname();
  const pageName: string | undefined = pathname
    .split('/')
    .filter(Boolean)
    .pop();

  return (
    <nav>
      <ul className='w-full h-16 fixed top-0 bg-card flex items-center justify-between p-4 border-b-[.080rem] z-20'>
        <li className='flex items-center gap-2'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={40} />
          </button>

          <h2 className='text-2xl font-bold'> Postmorph </h2>
        </li>
        <li>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className='border-2 border-primary rounded-full mr-2'>
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

              <ul className='w-full flex flex-col gap-y-5 py-2 border-b-2 my-2'>
                <li className='flex items-center gap-2'>
                  <CircleUserRound size={20} /> Account
                </li>
                <li className='flex items-center gap-2'>
                  <Bell size={20} /> Notifications
                </li>
              </ul>

              <button className='flex items-center gap-2 text-red-600'>
                <LogOut size={20} /> Logout
              </button>
            </PopoverContent>
          </Popover>
        </li>
      </ul>

      <div
        className={`w-[60%] fixed top-0 bottom-0 ${
          isMenuOpen ? 'left-0' : 'left-[-60%]'
        } flex flex-col bg-sidebar text-sidebar-foreground p-4 pt-20 border-r-[.080rem] transition-all duration-300 z-10`}>
        <Link
          href='/dashboard'
          className='w-[90%] flex items-center bg-primary text-primary-foreground gap-2 p-4 rounded-lg'>
          <LayoutDashboard />
          Dashboard
        </Link>

        {Object.entries(navbarRoutes).map(([section, routes]) => (
          <div key={section}>
            <h3 className='font-bold capitalize mt-6 mb-2'>
              {section === 'aiTools' ? 'AI Tools' : section}
            </h3>
            <ul className='flex flex-col gap-y-[.1rem] text-[.9rem] text-muted-foreground border-b-2'>
              {routes.map(route => {
                const Icon = route.icon;
                const isActive = pageName === route.url.split('/').pop();

                return (
                  <li key={route.url} onClick={() => setIsMenuOpen(false)}>
                    <Link
                      href={route.url}
                      className={`${
                        isActive ? 'bg-sidebar-border text-foreground' : ''
                      } flex items-center p-2 gap-x-2 rounded-md hover:bg-sidebar-border hover:text-foreground`}>
                      <Icon size={16} />
                      {route.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className='bg-card p-3 rounded-xl mt-auto'>
          <button className='w-full flex items-center gap-2'>
            <Send size={35} className='p-2 border border-border rounded-lg' />
            <h3> Feedback </h3>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
