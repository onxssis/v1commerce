import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withTestRouter } from '@/shared/withTestRouter';
import HomePage from './HomePage';

jest.mock('@/hooks/useSession', () => {
  return jest.fn(() => {
    return {
      session: {
        user: {
          admin: true,
        },
        loggedIn: true,
      },
    };
  });
});

it('should render add new product button if admin is logged in', () => {
  render(
    withTestRouter(
      <MockedProvider mocks={[]}>
        <HomePage />
      </MockedProvider>
    )
  );

  const button = screen.queryByText('Add Product');
  expect(button).not.toBeNull();
});
