import * as React from 'react';

import Header from '@/components/Header/Header';

export interface IMainLayoutProps {
  headerVariant?: 'transparent' | 'full';
}

const MainLayout: React.FC<IMainLayoutProps> = ({
  headerVariant = 'transparent',
  children,
}) => {
  return (
    <>
      <Header transparent={headerVariant === 'transparent'} />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
