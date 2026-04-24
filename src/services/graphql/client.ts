import { ApolloClient, InMemoryCache, HttpLink, from, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { NAVIGATION_ROUTES } from '@/constants/routes';
import { tokenService } from '../api/token.service';

const GRAPHQL_URI = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001'}/graphql`;
const BASE_PATH = import.meta.env.VITE_APP_BASENAME_PATH || '/';

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
});

// Auth link to add JWT token to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Error link to handle GraphQL errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: any) => {
  const isUnauth =
    graphQLErrors?.some((e: any) =>
      e.extensions?.code === 'UNAUTHENTICATED' ||
      e.extensions?.code === 'FORBIDDEN'
    ) || (networkError as any)?.statusCode === 401;

  if (!isUnauth) return;

  return new Observable(observer => {
    tokenService.refresh().then(newToken => {
      if (!newToken) {
        window.location.href = `${BASE_PATH}${NAVIGATION_ROUTES.LOGIN}`.replace('//', '/');
        observer.error(new Error('Refresh failed'));
        return;
      }

      // Retry request gốc
      forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });
    }).catch(err => observer.error(err));
  });
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
