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

const errorLink = onError(
  ({ error, operation, forward }) => {
    console.log('apollo error:', error);

    const isUnauth =
      error?.message?.includes(
        'Unauthorized',
      ) ||
      error?.message?.includes(
        'UNAUTHENTICATED',
      ) ||
      error?.message?.includes(
        'FORBIDDEN',
      );


    if (!isUnauth) return;

    return new Observable((observer) => {
      tokenService
        .refresh()
        .then((newToken) => {

          if (!newToken) {
            localStorage.clear();

            window.location.href =
              '/login';

            observer.error(
              new Error(
                'Refresh failed',
              ),
            );
            return;
          }

          operation.setContext({
            headers: {
              ...operation.getContext()
                .headers,
              Authorization:
                `Bearer ${newToken}`,
            },
          });

          forward(operation).subscribe({
            next:
              observer.next.bind(
                observer,
              ),
            error:
              observer.error.bind(
                observer,
              ),
            complete:
              observer.complete.bind(
                observer,
              ),
          });
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  },
);
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
