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
const PublicSettings = lazy(() => import('@/pages/settings/PublicSettings'));
const ManageSettings = lazy(() => import('@/pages/settings/ManageSettings'));

// Portfolio pages
const NavigationPage = lazy(() => import('@/pages/portfolio/navigation'));
const SocialLinksPage = lazy(() => import('@/pages/portfolio/social-links'));
const SkillsPage = lazy(() => import('@/pages/portfolio/skills'));
const WorkExperiencesPage = lazy(() => import('@/pages/portfolio/work-experiences'));
const TagsPage = lazy(() => import('@/pages/portfolio/tags'));
const ProjectsPage = lazy(() => import('@/pages/portfolio/projects'));
const ArticlesPage = lazy(() => import('@/pages/portfolio/articles'));

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
      // Portfolio routes
      {
        path: 'portfolio',
        children: [
          {
            index: true,
            element: <Navigate to="navigation" replace />,
          },
          {
            path: 'navigation',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <NavigationPage />
              </Suspense>
            ),
          },
          {
            path: 'social-links',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <SocialLinksPage />
              </Suspense>
            ),
          },
          {
            path: 'skills',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <SkillsPage />
              </Suspense>
            ),
          },
          {
            path: 'work-experiences',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <WorkExperiencesPage />
              </Suspense>
            ),
          },
          {
            path: 'tags',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <TagsPage />
              </Suspense>
            ),
          },
          {
            path: 'projects',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ProjectsPage />
              </Suspense>
            ),
          },
          {
            path: 'articles',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ArticlesPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            index: true,
            element: <Navigate to="manage" replace />,
          },
          {
            path: 'manage',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ManageSettings />
              </Suspense>
            ),
          },
          {
            path: 'public',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <PublicSettings />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
], {
  basename,
});
