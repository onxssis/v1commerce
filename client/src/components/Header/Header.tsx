import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';
import { fetchJson } from '@/shared';
import { AUTH_TOKEN } from '@/constants';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent }) => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const { session, mutateUser } = useSession();

  const isAdmin = session ? session.user?.admin : false;

  const logout = async () => {
    await fetchJson('/api/logout');
    await mutateUser(fetchJson('/api/sessions'));

    localStorage.removeItem(AUTH_TOKEN);

    router.push('/');
  };

  return (
    <>
      <nav
        className={
          (transparent
            ? 'top-0 absolute z-50 w-full'
            : 'relative shadow-lg bg-white') +
          ' flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg'
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className={
                  (transparent ? 'text-white' : 'text-gray-800') +
                  ' text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase'
                }
                href="/"
              >
                v1commerce
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (transparent ? 'text-white' : 'text-gray-800') +
                  ' fas fa-bars'
                }
              ></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
              (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link href="/">
                  <a
                    className={
                      (transparent
                        ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                        : 'text-gray-800 hover:text-gray-600') +
                      ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                    }
                  >
                    Products
                  </a>
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {isAdmin && (
                <li className="flex items-center">
                  <button
                    className={
                      (transparent
                        ? 'bg-white text-gray-800 active:bg-gray-100'
                        : 'bg-blue-500 text-white active:bg-blue-600') +
                      ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3'
                    }
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => router.push('/admin/new-product')}
                  >
                    New Product
                  </button>
                </li>
              )}

              {session && session.isLoggedIn ? (
                <li className="flex items-center">
                  <button
                    className={
                      (transparent
                        ? 'bg-white text-gray-800 active:bg-gray-100'
                        : 'bg-blue-500 text-white active:bg-blue-600') +
                      ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3'
                    }
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="flex items-center">
                  <button
                    className={
                      (transparent
                        ? 'bg-white text-gray-800 active:bg-gray-100'
                        : 'bg-blue-500 text-white active:bg-blue-600') +
                      ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3'
                    }
                    type="button"
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
