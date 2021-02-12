import React from 'react';

import MainLayout from '@/layouts/Main/Main';
import useSession from '@/hooks/useSession';
import EditProduct from '@/views/admin/Products/EditProduct';

function EditProductPage() {
  useSession({ redirectTo: '/login' });

  return (
    <MainLayout headerVariant="full">
      <EditProduct />
    </MainLayout>
  );
}

export default EditProductPage;
