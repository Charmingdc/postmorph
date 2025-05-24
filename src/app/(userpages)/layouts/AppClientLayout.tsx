'use client';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MobileNavbar from './components/MobileNavbar';
import MobileFooter from './components/MobileFooter';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile: boolean | undefined = useIsMobile();

  return (
    <div className={`w-screen flex ${isMobile ? 'flex-col' : 'min-h-screen'}`}>
      {isMobile ? (
        <header>
          <MobileNavbar />
        </header>
      ) : (
        <aside className='w-64'>
          <Sidebar />
        </aside>
      )}

      <main
        className={`min-h-screen p-4 ${
          !isMobile ? 'bg-background rounded-lg m-4' : 'pb-24'
        } flex-1`}>
        {!isMobile && <Topbar />}
        {children}
      </main>

      <footer> {isMobile && <MobileFooter />} </footer>
    </div>
  );
};

export default AppLayout;
