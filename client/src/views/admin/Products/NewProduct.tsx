import React from 'react';

import ProductForm from './ProductForm';

const NewProduct = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen"
        style={{ backgroundColor: '#f9f9f9' }}
      >
        <h4 className="text-3xl font-normal text-center leading-normal mt-4 mb-6 text-gray-800">
          Create Product
        </h4>
        <ProductForm type="Create" />
      </div>
    </>
  );
};

export default NewProduct;
