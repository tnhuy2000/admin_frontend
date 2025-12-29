/**
 * Application route constants
 * Centralized route definitions for type-safe navigation
 */

export enum NAVIGATION_ROUTES {
  // Root
  HOME = '/',

  // Auth routes
  LOGIN = '/login',

  // Dashboard
  DASHBOARD = '/dashboard',

  // Content routes
  CONTENT = '/content',
  CONTENT_CREATE = '/content/create',
  CONTENT_CATEGORIES = '/content/categories',

  // Media routes
  MEDIA = '/media',

  // Settings routes
  SETTINGS = '/settings',
}

/**
 * Helper function to build dynamic routes
 */
export const buildRoute = {
  contentEdit: (id: string) => `/content/edit/${id}`,
  contentView: (id: string) => `/content/view/${id}`,
  categoryEdit: (id: string) => `/content/categories/edit/${id}`,
} as const;
