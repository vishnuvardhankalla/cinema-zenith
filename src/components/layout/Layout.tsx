import { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { SideNav } from './SideNav';
import { BottomTabs } from './BottomTabs';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <TopBar />
      <div className="app-body">
        <SideNav />
        <main className="app-content">
          {children}
        </main>
      </div>
      <BottomTabs />
    </>
  );
};