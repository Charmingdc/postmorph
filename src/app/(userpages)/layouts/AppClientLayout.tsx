'use client';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MobileNavbar from './components/MobileNavbar';
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
        className={`min-h-screen bg-background flex-1 p-4 ${
          isMobile ? 'mt-12' : 'rounded-lg m-4'
        }`}>
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
