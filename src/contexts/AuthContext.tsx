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

const clearSession = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('currentUser');
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const cached = sessionStorage.getItem('currentUser');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      clearSession();
      setIsLoading(false);
      return;
    }

    // Restore cache ngay để UI không bị block
    const cached = sessionStorage.getItem('currentUser');
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch {
        // cache lỗi, sẽ fetch lại bên dưới
      }
      setIsLoading(false);
    }

    // Verify token ngầm — Apollo Error Link tự xử lý refresh nếu hết hạn
    apolloClient
      .query<GetMeQuery>({
        query: GET_ME,
        fetchPolicy: 'network-only',
      })
      .then(({ data, errors }: any) => {
        if (errors && errors.length > 0) {
          // Có lỗi GraphQL trả về nhưng không được xử lý bởi errorLink (VD: lỗi 500, lỗi server)
          // Không nên tự động xóa phiên đăng nhập để tránh văng app oan uổng.
          return;
        }

        if (data?.me) {
          const fresh: User = {
            email: data.me.email,
            name: data.me.name,
            role: data.me.role,
          };
          setUser(fresh);
          sessionStorage.setItem('currentUser', JSON.stringify(fresh));
        } else {
          // Server trả về thành công nhưng hoàn toàn không có user → logout
          clearSession();
          setUser(null);
        }
      })
      .catch(() => {
        // Apollo Error Link đã xử lý refresh + retry
        // Nếu vào đây nghĩa là refresh cũng fail → đã redirect /login
        // Không cần làm gì thêm
      })
      .finally(() => {
        if (!cached) setIsLoading(false);
      });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      sessionStorage.setItem('currentUser', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      clearSession();
      setUser(null);
      await apolloClient.clearStore();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};