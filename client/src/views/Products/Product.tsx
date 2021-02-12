import { ApolloError, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/Button/Button';
import { DELETE_PRODUCT, PRODUCTS } from '@/queries';

export interface IProduct {
  id: string;
  name: string;
  slug?: string;
  brand: string;
  price: number;
  image: string;
  summary: string;
  createdAt?: number;
  updatedAt?: number;
  isAdmin?: boolean;
}

const Product: React.FC<IProduct> = ({ id, name, summary, price, image, isAdmin = false }) => {
  const router = useRouter();

  const handleOnError = (err: ApolloError) => {
    alert(err.message);
  };

  const handleOnCompleted = () => {
    router.push('/');
  };

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: PRODUCTS }],
    onError: handleOnError,
    onCompleted: handleOnCompleted,
  });

  const handleOnDelete = async () => {
    await deleteProduct({ variables: { id } })
  }

  return (
    <div
      className="rounded overflow-hidden shadow-lg mb-4 flex flex-col"
      key={id}
    >
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-xl">{name}</h4>
          <b>${price}</b>
        </div>
        <p className="text-grey-darker text-base">{summary}</p>
      </div>
      <div className="px-6 py-4 mt-auto">
        {isAdmin ? (
          <div>
            <Button
              onClick={() => router.push(`/admin/edit-product/${id}`)}
              className="w-full"
            >
              Edit
            </Button>
            <Button onClick={handleOnDelete} className="w-full" bg="red">
              Delete
            </Button>
          </div>
        ) : (
          <Button onClick={() => {}} className="w-full">
            <span className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="mr-2"
                fill="#fff"
              >
                <path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z" />
              </svg>{' '}
              Add To Cart
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Product;
