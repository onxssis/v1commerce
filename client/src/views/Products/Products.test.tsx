import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor, screen } from '@testing-library/react';

import { PRODUCTS } from '../../queries';
import Products from './Products';

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const product = {
  id: '1',
  name: 'Samsung Galaxy J6',
  slug: 'samsung-galaxy-j6',
  brand: 'Samsung',
  price: 100,
  image: 'image-url.jpg',
  summary: 'Samsung Galaxy J6 Summary',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  __typename: 'Product',
};

const mocks = [
  {
    request: {
      query: PRODUCTS,
    },
    result: {
      data: {
        products: [product],
      },
    },
  },
];

const mocksError = [
  {
    request: {
      query: PRODUCTS,
    },
    error: new Error('aw shucks'),
  },
];

it('should render products page successfully', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Products />
    </MockedProvider>
  );

  await waitFor(() => wait(0));

  const product = screen.queryAllByText('Samsung Galaxy J6');

  expect(product).toHaveLength(1);
});

it('should render products page loading state initially', () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Products />
    </MockedProvider>
  );

  const spinner = container.querySelector('.spinner');
  expect(spinner).not.toBeNull();
});

it('should show products page error', async () => {
  render(
    <MockedProvider mocks={mocksError} addTypename={false}>
      <Products />
    </MockedProvider>
  );

  await waitFor(() => wait(0));

  const errorText = screen.queryByText('An error occured!');
  expect(errorText).not.toBeNull();
});

it('should show edit and delete button if isAdmin', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Products isAdmin={true} />
    </MockedProvider>
  );

  await wait(0);

  const editProductButton = screen.findAllByText('Edit');
  expect(editProductButton).not.toBeNull();
});
