import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/api/auth.service';
import { apolloClient } from '@/services/graphql/client';
import { GET_ME } from '@/codegen/graphql-definition/admin-service/queries';
import type { GetMeQuery } from '@/graphql/generated';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from sessionStorage if available (persists across HMR)
    const cachedUser = sessionStorage.getItem('currentUser');
    return cachedUser ? JSON.parse(cachedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (check localStorage for token)
    const token = localStorage.getItem('accessToken');
    const cachedUser = sessionStorage.getItem('currentUser');

    // If we have both token and cached user, restore session immediately
    if (token && cachedUser) {
      console.log('Restoring session from cache');
      try {
        const userData = JSON.parse(cachedUser);
        setUser(userData);
        setIsLoading(false);

        // Verify token in background (don't block UI)
        apolloClient
          .query<GetMeQuery>({
            query: GET_ME,
            fetchPolicy: 'network-only',
          })
          .then(({ data }) => {
            if (data?.me) {
              // Update with fresh data
              const freshUser = {
                email: data.me.email,
                name: data.me.name,
                role: data.me.role,
              };
              setUser(freshUser);
              sessionStorage.setItem('currentUser', JSON.stringify(freshUser));
            } else {
              // No user data, logout
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              sessionStorage.removeItem('currentUser');
              setUser(null);
            }
          })
          .catch((error) => {
            console.error('Background auth check error:', error);
            // Only logout on auth errors, not network errors
            if (
              error?.graphQLErrors?.some((e: any) =>
                e?.extensions?.code === 'UNAUTHENTICATED' ||
                e?.extensions?.code === 'FORBIDDEN'
              ) ||
              error?.networkError?.statusCode === 401
            ) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              sessionStorage.removeItem('currentUser');
              setUser(null);
            }
            // On network errors, keep cached session
          });
      } catch (e) {
        console.error('Error parsing cached user:', e);
        setIsLoading(false);
      }
      return;
    }

    // No cached session, fetch fresh data
    if (token) {
      console.log('Token found, fetching user data...');
      apolloClient
        .query<GetMeQuery>({
          query: GET_ME,
          fetchPolicy: 'network-only',
        })
        .then(({ data }) => {
          console.log('GetMe response:', data);
          if (data?.me) {
            const userData = {
              email: data.me.email,
              name: data.me.name,
              role: data.me.role,
            };
            setUser(userData);
            sessionStorage.setItem('currentUser', JSON.stringify(userData));
            console.log('User data set successfully');
          } else {
            console.log('No user data in response');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('currentUser');
          }
        })
        .catch((error) => {
          console.error('GetMe error:', error);
          // Only clear tokens if it's a definite authentication error
          if (
            error?.graphQLErrors?.some((e: any) =>
              e?.extensions?.code === 'UNAUTHENTICATED' ||
              e?.extensions?.code === 'FORBIDDEN'
            ) ||
            error?.networkError?.statusCode === 401
          ) {
            console.log('Authentication error, clearing tokens');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('currentUser');
            setUser(null);
          }
          // On other errors (network), keep tokens for retry
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log('No token found');
      sessionStorage.removeItem('currentUser');
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });

      // Store tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Cache user data in sessionStorage for HMR persistence
      sessionStorage.setItem('currentUser', JSON.stringify(data.user));

      // Set user data
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call backend logout API to invalidate refresh token
      await authService.logout();
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear all storage and user state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('currentUser');
      setUser(null);

      // Clear Apollo cache
      await apolloClient.clearStore();
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
