import React from 'react';

import { useRouter } from 'next/router';
import { ApolloError, useMutation } from '@apollo/client';

import { LOGIN, SIGNUP } from '@/queries';
import Error from '@/components/Error/Error';
import { fetchJson } from '@/shared';
import useSession from '@/hooks/useSession';
import Button from '@/components/Button/Button';
import { AUTH_TOKEN } from '@/constants';

const LoginPage = () => {
  const { mutateUser } = useSession();

  const formState = {
    username: '',
    password: '',
    name: '',
  };

  const router = useRouter();

  const [isLogin, setIsLogin] = React.useState(true);
  const [form, setForm] = React.useState(formState);
  const [error, setError] = React.useState<any>();

  const handleOnError = (err: ApolloError) => {
    setError(err.message);
  };

  const handleOnSuccess = async (data: any) => {
    const { token, user } = isLogin ? data.login : data.signup;

    setForm(formState);

    await _saveUserData(token, user);

    router.push('/');
  };

  const [authMutation, { loading }] = useMutation(isLogin ? LOGIN : SIGNUP, {
    onError: handleOnError,
    onCompleted: handleOnSuccess,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(undefined);

    let variables: any = { username: form.username, password: form.password };


    if (!isLogin) {
      variables = { username: form.username, password: form.password, name: form.name };
    }

    authMutation({ variables });
  };

  const _saveUserData = async (token: string, user: any) => {
    try {
      const userResponse = await fetchJson('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, token }),
      });

      console.log(userResponse, 'res');

      localStorage.setItem(AUTH_TOKEN, token);

      await mutateUser(userResponse);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <main>
      <section className="absolute w-full h-full">
        <div className="absolute top-0 w-full h-full bg-gray-900"></div>
        <div className="px-4 h-full absolute w-full">
          <div className="flex content-center items-center justify-center h-full">
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
                    {isLogin === false && (
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
                          onChange={handleOnChange}
                        />
                      </div>
                    )}

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Username"
                        style={{ transition: 'all .15s ease' }}
                        value={form.username}
                        name="username"
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Password"
                        style={{ transition: 'all .15s ease' }}
                        name="password"
                        value={form.password}
                        onChange={handleOnChange}
                      />
                    </div>

                    <div className="text-center mt-6">
                      <Button
                        className="w-full"
                        disabled={loading}
                        type="submit"
                      >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6">
                <div className="w-full text-right">
                  <button
                    onClick={() => setIsLogin((login) => !login)}
                    className="text-gray-300"
                  >
                    <small>
                      {isLogin
                        ? 'Create an account'
                        : 'I already have an account'}
                    </small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
