import React from 'react';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import ProductForm from './ProductForm';
import { PRODUCT } from '@/queries';

const EditProduct: React.FC = () => {
  const router = useRouter();
  const id = router.query.pid;

  const { data, loading, error } = useQuery(PRODUCT, { variables: { id } });

  if (error) {
    router.push('/');
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen"
        style={{ backgroundColor: '#f9f9f9' }}
      >
        <h4 className="text-3xl font-normal text-center leading-normal mt-4 mb-6 text-gray-800">
          Edit {data && data.product.name}
        </h4>
        {data && <ProductForm {...data.product} type="Edit" />}
      </div>
    </>
  );
};

export default EditProduct;
