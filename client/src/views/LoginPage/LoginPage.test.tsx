import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LOGIN } from '../../queries';
import LoginPage from './LoginPage';
import { withTestRouter } from '@/shared/withTestRouter';

jest.mock('@/shared');

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const admin = {
  name: 'Administrator',
  username: 'admin',
  password: '123456',
  admin: true,
};

const adminResponse = {
  token: 'Token',
  user: {
    name: 'Admininistrator',
    username: 'admin',
    password: '123456',
    admin: true,
  },
};

const user = {
  name: 'User',
  username: 'user',
  password: '123456',
  admin: false,
};

const mocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        username: admin.username,
        password: admin.password,
      },
    },
    result: {
      data: {
        login: adminResponse,
      },
    },
  },
];

const mocksError = [
  {
    request: {
      query: LOGIN,
      variables: {
        username: admin.username,
        password: admin.password,
      },
    },
    error: new Error('aw shucks'),
  },
];

it('should render LoginPage without error', () => {
  render(
    <MockedProvider mocks={[]}>
      <LoginPage />
    </MockedProvider>
  );

  const errorDiv = screen.queryByText('Error!');
  const button = screen.queryByText('Sign In');
  expect(errorDiv).toBeNull();
  expect(button).not.toBeNull();
});

it('should not log user in', async () => {
  render(
    <MockedProvider mocks={mocksError} addTypename={false}>
      <LoginPage />
    </MockedProvider>
  );

  // find the inputs and type in them
  const username = screen.queryAllByPlaceholderText('Username');
  userEvent.type(username[0], admin.username);

  const password = screen.queryAllByPlaceholderText('Password');
  userEvent.type(password[0], admin.password);

  // find the button and simulate a click
  const button = screen.queryAllByText('Sign In');
  userEvent.click(button[0]); // fires the mutation

  await waitFor(() => wait(0));

  const errorDiv = screen.queryByText('Error! aw shucks');
  expect(errorDiv).toBeVisible();
});

it('should successfully log user in', async () => {
  const push = jest.fn();

  render(
    withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>,
      { push }
    )
  );

  // find the inputs and type in them
  const username = screen.queryAllByPlaceholderText('Username');
  userEvent.type(username[0], admin.username);

  const password = screen.queryAllByPlaceholderText('Password');
  userEvent.type(password[0], admin.password);

  // find the button and simulate a click
  const button = screen.queryAllByText('Sign In');
  userEvent.click(button[0]); // fires the mutation

  expect(button[0]).toBeDisabled();

  await waitFor(() => wait(0));

  expect(push).toHaveBeenCalledWith('/');
});
