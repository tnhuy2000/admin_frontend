import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/api/auth.service';
import { apolloClient } from '@/services/graphql/client';
import { GET_ME } from '../../codegen/graphql-definition/admin-service/queries';

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (check localStorage for token)
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log('Token found, fetching user data...');
      // Fetch user data from GraphQL
      apolloClient
        .query({
          query: GET_ME,
          fetchPolicy: 'network-only',
        })
        .then(({ data }) => {
          console.log('GetMe response:', data);
          if (data?.me) {
            setUser({
              email: data.me.email,
              name: data.me.name,
              role: data.me.role,
            });
            console.log('User data set successfully');
          } else {
            console.log('No user data in response');
            // Only clear tokens if we got a response but no user data
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        })
        .catch((error) => {
          console.error('GetMe error:', error);
          // Only clear tokens if it's an authentication error
          if (error?.graphQLErrors?.some((e: any) => e?.extensions?.code === 'UNAUTHENTICATED')) {
            console.log('Authentication error, clearing tokens');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          } else {
            // For other errors (network issues, etc.), keep the tokens and retry later
            console.log('Network or other error, keeping tokens for retry');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log('No token found');
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });

      // Store tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

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
      // Clear local storage and user state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
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
