import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

const formatPageName = (name: string | undefined) => {
  if (!name) return '';
  return name.replace(/-/g, ' ');
};

const Topbar = () => {
  const pathname: string = usePathname();
  const pageName: string | undefined = pathname
    .split('/')
    .filter(Boolean)
    .pop();

  return (
    <nav className='w-full'>
      <ul className='w-full flex items-center justify-between gap-4 mb-2'>
        <li className='capitalize'>
          <h2 className='text-2xl font-bold'>
            {pageName === 'dashboard'
              ? `Welcome back, Charmingdc`
              : formatPageName(pageName)}
          </h2>
        </li>
        <li>
          <Link href={pathname} className='p-2 pl-8'>
            <RefreshCw
              size={26}
              className='transition-transform duration-300 hover:rotate-180'
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
