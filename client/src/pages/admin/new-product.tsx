import React from 'react';

import MainLayout from '@/layouts/Main/Main';
import useSession from '@/hooks/useSession';
import NewProduct from '@/views/admin/Products/NewProduct';

function NewProductPage() {
  useSession({ redirectTo: '/login' });

  return (
    <MainLayout headerVariant="full">
      <NewProduct />
    </MainLayout>
  );
}

export default NewProductPage;
