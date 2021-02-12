import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

export default function useSession({
  redirectTo = false,
}: {
  redirectTo?: boolean | string;
} = {}) {
  const { data: session, mutate: mutateUser } = useSWR('/api/sessions');

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !session) return;

    // If redirectTo is set, redirect if the user is not found.
    if (redirectTo && !session?.isLoggedIn) {
      Router.push(redirectTo as string);
    }

    // // If redirectTo is set, redirect if the user is found. eg login page
    // if (redirectTo && session?.isLoggedIn) {
    //   Router.push(redirectTo as string);
    // }
  }, [session, redirectTo]);

  return { session, mutateUser };
}
