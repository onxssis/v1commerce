import React from 'react';

import MainLayout from '@/layouts/Main/Main';
import useSession from '@/hooks/useSession';

function Private() {
  useSession({ redirectTo: "/login" });

  return (
    <MainLayout>
      <div>Private Page</div>
    </MainLayout>
  );
}

export default Private;
