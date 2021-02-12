import React from 'react';
import { useQuery } from '@apollo/client';

import Product, { IProduct } from './Product';

import { PRODUCTS } from '@/queries';
import Spinner from '@/components/Spinner/Spinner';
import Error from '@/components/Error/Error';

interface IProductProps {
  isAdmin?: boolean;
}

const Products: React.FC<IProductProps> = ({ isAdmin = false }) => {
  const { data, loading, error } = useQuery(PRODUCTS);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error title="An error occured" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:gap-6">
      {data &&
        data.products.map((product: IProduct) => (
          <Product isAdmin={isAdmin} {...product} key={product.id} />
        ))}
    </div>
  );
};

export default Products;
