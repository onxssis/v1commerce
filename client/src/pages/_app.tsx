import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { SWRConfig } from 'swr';

import '../tailwind.css';

import { AUTH_TOKEN, API_URI } from "../constants";
import { fetchJson } from '@/shared';

const authLink = setContext((_: any, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const httpLink = createHttpLink({
  uri: API_URI
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SWRConfig
        value={{
          onError: (err: any) => {
            console.error(err);
          },
          fetcher: fetchJson
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ApolloProvider>
  );
}

export default MyApp;