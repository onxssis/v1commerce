import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProductForm from './ProductForm';
import { CREATE_PRODUCT, PRODUCTS, UPDATE_PRODUCT } from '@/queries';
import { withTestRouter } from '@/shared/withTestRouter';

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const product = {
  id: '1',
  name: 'Samsung Galaxy J6 Edited',
  brand: 'Samsung',
  price: 0,
  image: 'http://imgplaceholder.com/jpeg.png',
  summary: 'Samsung Galaxy J6 Summary',
  slug: 'samsung-galaxy-j6',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const mocks = [
  {
    request: {
      query: UPDATE_PRODUCT,
      variables: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        summary: product.summary,
      },
    },
    result: {
      data: {
        product,
      },
    },
  },
  {
    request: {
      query: CREATE_PRODUCT,
      variables: {
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        summary: product.summary,
      },
    },
    result: {
      data: {
        product,
      },
    },
  },
  {
    request: {
      query: PRODUCTS,
    },
    result: {
      data: {
        product,
      },
    },
  },
];

it('should render new product form', () => {
  render(
    <MockedProvider mocks={[]}>
      <ProductForm type="Create" />
    </MockedProvider>
  );

  const button = screen.queryByRole('button');
  expect(button).toHaveTextContent('Create Product');
});

it('should render new edit form', () => {
  render(
    <MockedProvider mocks={[]}>
      <ProductForm type="Edit" />
    </MockedProvider>
  );

  const button = screen.queryByRole('button');
  expect(button).toHaveTextContent('Update Product');
});

it('should update the product', async () => {
  const push = jest.fn();

  render(
    withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductForm type="Edit" {...product} />
      </MockedProvider>,
      { push }
    )
  );

  const button = screen.queryAllByRole('button');
  act(() => userEvent.click(button[0]));

  expect(button[0]).toBeDisabled();

  await waitFor(() => wait(0));

  expect(push).toHaveBeenCalledWith('/');
});

it('should create a product', async () => {
  const push = jest.fn();

  render(
    withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductForm
          type="Create"
          name={product.name}
          brand={product.brand}
          price={product.price}
          summary={product.summary}
          image={product.image}
        />
      </MockedProvider>,
      { push }
    )
  );

  const button = screen.queryAllByRole('button');
  act(() => userEvent.click(button[0]));

  expect(button[0]).toBeDisabled();

  await waitFor(() => wait(0));

  expect(push).toHaveBeenCalledWith('/');
});
