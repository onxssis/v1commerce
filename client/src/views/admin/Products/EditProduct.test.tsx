import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';

import EditProduct from './EditProduct';
import { PRODUCT } from '../../../queries';
import { withTestRouter } from '@/shared/withTestRouter';

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const product = {
  id: '1',
  brand: 'Samsung',
  name: 'Samsung Galaxy J6',
  slug: 'samsung-galaxy-j6',
  price: 100,
  image: 'image-url.jpg',
  summary: 'Samsung Galaxy J6 Summary',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const mocks = [
  {
    request: {
      query: PRODUCT,
      variables: {
        id: '1',
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
      query: PRODUCT,
      variables: {
        id: '2',
      },
    },
    result: {
      data: {
        product,
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: PRODUCT,
      variables: {
        id: '1',
      },
    },
    error: new Error(),
  },
];

describe('Edit Product Tests', () => {
  it('should render loading state initially', async () => {
    const { container } = render(
      withTestRouter(
        <MockedProvider mocks={mocks}>
          <EditProduct />
        </MockedProvider>,
        { query: { pid: '1' } }
      )
    );

    const loadingText = container.querySelector('p');
    expect(loadingText).toHaveTextContent('Loading...');
  });

  it('should render edit product page and form', async () => {
    const { container } = render(
      withTestRouter(
        <MockedProvider mocks={mocks} addTypename={false}>
          <EditProduct />
        </MockedProvider>,
        { query: { pid: '2' } }
      )
    );

    await waitFor(() => wait(0));

    const heading = container.querySelector('h4');
    expect(heading).toHaveTextContent('Edit Samsung Galaxy J6');
  });

  it('should redirect to homepage if error occurs while getting produt', async () => {
    const push = jest.fn();

    render(
      withTestRouter(
        <MockedProvider mocks={errorMock} addTypename={false}>
          <EditProduct />
        </MockedProvider>,
        { query: { pid: '1' }, push }
      )
    );

    await waitFor(() => wait(0));

    expect(push).toHaveBeenCalledWith("/");
  });
});
