// src/services/api/token.service.ts
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001';

let isRefreshing = false;
let pendingCallbacks: Array<(token: string) => void> = [];

export const tokenService = {
  async refresh(): Promise<string | null> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    if (isRefreshing) {
      // Đợi request đang refresh xong
      return new Promise((resolve) => {
        pendingCallbacks.push((token) => resolve(token));
      });
    }

    isRefreshing = true;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) throw new Error('Refresh failed');

      const data = await res.json();
      const newToken = data.accessToken;
      const newRefresh = data.refreshToken;

      localStorage.setItem('accessToken', newToken);
      if (newRefresh) localStorage.setItem('refreshToken', newRefresh);

      // Notify tất cả request đang chờ
      pendingCallbacks.forEach(cb => cb(newToken));
      pendingCallbacks = [];

      return newToken;
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('currentUser');
      return null;
    } finally {
      isRefreshing = false;
    }
  },

  clearSession() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('currentUser');
  }
};