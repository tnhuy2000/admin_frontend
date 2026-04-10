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

  // Portfolio routes
  PORTFOLIO = '/portfolio',
  PORTFOLIO_NAVIGATION = '/portfolio/navigation',
  PORTFOLIO_SOCIAL_LINKS = '/portfolio/social-links',
  PORTFOLIO_SKILLS = '/portfolio/skills',
  PORTFOLIO_WORK_EXPERIENCES = '/portfolio/work-experiences',
  PORTFOLIO_TAGS = '/portfolio/tags',
  PORTFOLIO_PROJECTS = '/portfolio/projects',
  PORTFOLIO_ARTICLES = '/portfolio/articles',

  // Settings routes
  SETTINGS = '/settings',
  SETTINGS_MANAGE = '/settings/manage',
  SETTINGS_PUBLIC = '/settings/public',
}

/**
 * Helper function to build dynamic routes
 */
export const buildRoute = {
  contentEdit: (id: string) => `/content/edit/${id}`,
  contentView: (id: string) => `/content/view/${id}`,
  categoryEdit: (id: string) => `/content/categories/edit/${id}`,
} as const;
