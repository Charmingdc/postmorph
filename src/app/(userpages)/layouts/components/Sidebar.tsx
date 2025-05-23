import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { layoutRoutes as sidebarRoutes } from '../constants/layoutRoutes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  LayoutDashboard,
  Send,
  ChevronsUpDown,
  CircleUserRound,
  Bell,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const pathname: string = usePathname();
  const pageName: string | undefined = pathname
    .split('/')
    .filter(Boolean)
    .pop();

  return (
    <nav>
      <div className='w-64 h-screen fixed flex flex-col gap-2 p-4 bg-sidebar border-r-2'>
        <div className='flex items-center pb-2 border-b-[.080rem] mb-2'>
          <img
            src='/icons/postmorph-logo.png'
            alt='Postmorph Logo'
            width='40px'
            height='40px'
          />

          <h1 className='text-xl font-bold'>Postmorph</h1>
        </div>

        <Link
          href='/dashboard'
          className='w-[90%] flex items-center bg-primary text-primary-foreground gap-2 p-4 rounded-lg mb-2'>
          <LayoutDashboard />
          Dashboard
        </Link>

        {Object.entries(sidebarRoutes).map(([section, routes]) => (
          <div key={section}>
            <h3 className='font-bold capitalize mb-2'>
              {section === 'aiTools' ? 'AI Tools' : section}
            </h3>
            <ul className='flex flex-col gap-y-[.1rem] text-[.9rem] text-muted-foreground border-b-2 mb-2'>
              {routes.map(route => {
                const Icon = route.icon;
                const isActive = pageName === route.url.split('/').pop();
                return (
                  <li key={route.url}>
                    <Link
                      href={route.url}
                      className={`${
                        isActive ? 'bg-sidebar-border text-foreground' : ''
                      } flex items-center p-3 gap-x-2 rounded-md hover:bg-sidebar-border hover:text-foreground`}>
                      <Icon size={16} />
                      {route.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className='w-full mt-auto'>
          <button className='flex items-center gap-2'>
            <Send size={16} />
            <h3> Feedback </h3>
          </button>

          <div className='w-[98%] flex items-center bg-sidebar-border px-[3%] gap-2 py-2 rounded-lg mt-4'>
            <Avatar>
              <AvatarImage
                src='https://github.com/shadcn.png'
                alt='@shadcn'
                className='filter grayscale'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className='w-[54%] text-[.8rem]'>
              <p className='w-full font-bold truncate'> Charmingdc </p>
              <p className='w-full truncate'> charmingdc002@gmail.com </p>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <ChevronsUpDown />
              </PopoverTrigger>

              <PopoverContent className='rounded-xl'>
                <div className='w-ful flex items-center gap-2 pb-2 border-b-2'>
                  <Avatar>
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
          </div>
        </div>
        {/**  **/}
      </div>
    </nav>
  );
};

export default Sidebar;
