import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';

import NewProduct from './NewProduct';

it('should render new product page', async () => {
  render(
    <MockedProvider addTypename={false}>
      <NewProduct />
    </MockedProvider>
  );

  const heading = screen.queryByRole('heading');
  expect(heading).toHaveTextContent('Create Product');
});
