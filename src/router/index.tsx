import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingFallback } from '@/components/LoadingFallback';
import { NAVIGATION_ROUTES } from '@/constants/routes';

// Lazy load pages
const Login = lazy(() => import('@/pages/auth/Login').then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard').then(m => ({ default: m.Dashboard })));

const basename = import.meta.env.BASE_URL || '/';

export const router = createBrowserRouter([
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: NAVIGATION_ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={NAVIGATION_ROUTES.DASHBOARD} replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'content',
        element: <div className="p-6">All Content (Coming Soon)</div>,
      },
      {
        path: 'content/create',
        element: <div className="p-6">Create New Content (Coming Soon)</div>,
      },
      {
        path: 'content/categories',
        element: <div className="p-6">Content Categories (Coming Soon)</div>,
      },
      {
        path: 'media',
        element: <div className="p-6">Media Management (Coming Soon)</div>,
      },
      {
        path: 'settings',
        element: <div className="p-6">Settings (Coming Soon)</div>,
      },
    ],
  },
], {
  basename,
});
