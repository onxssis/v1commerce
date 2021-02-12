import React from 'react';
import { useRouter } from 'next/router';

import Error from '@/components/Error/Error';
import Button from '@/components/Button/Button';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_PRODUCT, PRODUCTS, UPDATE_PRODUCT } from '@/queries';

interface IProductForm {
  type: 'Create' | 'Edit';
  [x: string]: any;
}

const ProductForm: React.FC<IProductForm> = ({ type, ...props }) => {
  const formState = {
    id: props.id ?? '',
    name: props.name ?? '',
    brand: props.brand ?? '',
    price: props.price ?? 0,
    image: props.image ?? '',
    summary: props.summary ?? '',
  };

  const router = useRouter();

  const handleOnError = (err: ApolloError) => {
    console.log(err.message);
    setError(err.message);
  };

  const handleOnCompleted = () => {
    setForm(formState);
    router.push('/');
  };

  const [mutateProduct, { loading }] = useMutation(
    type === 'Create' ? CREATE_PRODUCT : UPDATE_PRODUCT,
    {
      refetchQueries: [{ query: PRODUCTS }],
      onError: handleOnError,
      onCompleted: handleOnCompleted,
    }
  );

  const [form, setForm] = React.useState(formState);
  const [error, setError] = React.useState<any>();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    type === 'Create' ? createProduct() : updateProduct();

    setError(undefined);
  };

  const createProduct = async () => {
    await mutateProduct({
      variables: {
        name: form.name,
        brand: form.brand,
        price: parseFloat(form.price),
        image: form.image,
        summary: form.summary
      },
    });
  };

  const updateProduct = async () => {
    await mutateProduct({
      variables: { ...form, id: formState.id, price: parseFloat(form.price) },
    });
  };

  return (
    <>
      <div className="w-full px-4 max-w-lg">
        {error && (
          <Error
            title="Error"
            message={error}
            onClose={() => setError(undefined)}
          />
        )}

        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10">
            <form onSubmit={handleFormSubmit}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Name"
                  style={{ transition: 'all .15s ease' }}
                  value={form.name}
                  name="name"
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Brand
                </label>
                <input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Brand"
                  style={{ transition: 'all .15s ease' }}
                  name="brand"
                  value={form.brand}
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Price
                </label>
                <input
                  type="number"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Price"
                  style={{ transition: 'all .15s ease' }}
                  name="price"
                  value={form.price}
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Image
                </label>
                <input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Image Url"
                  style={{ transition: 'all .15s ease' }}
                  name="image"
                  value={form.image}
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Description
                </label>
                <textarea
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Description"
                  style={{ transition: 'all .15s ease' }}
                  name="summary"
                  value={form.summary}
                  required
                  onChange={handleOnChange}
                />
              </div>

              <div className="text-center mt-6">
                <Button
                  type="submit"
                  className="w-full py-3 px-6"
                  disabled={loading}
                >
                  {type === 'Create' ? 'Create Product' : 'Update Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
