// User Types
export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: string;
  isActive?: boolean;
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  isActive?: boolean;
}

// Content Types
export enum ContentType {
  PAGE = 'PAGE',
  POST = 'POST',
  BLOG = 'BLOG',
  BANNER = 'BANNER',
  MENU = 'MENU',
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface Content {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: ContentType;
  status: ContentStatus;
  featuredImage: string;
  tags: string[];
  categories: string[];
  metadata: Record<string, any>;
  author: string;
  publishedAt?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedContent {
  data: Content[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryContentInput {
  type?: ContentType;
  status?: ContentStatus;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateContentInput {
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  type?: ContentType;
  status?: ContentStatus;
  featuredImage?: string;
  tags?: string[];
  categories?: string[];
  metadata?: Record<string, any>;
  author?: string;
  publishedAt?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateContentInput {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  type?: ContentType;
  status?: ContentStatus;
  featuredImage?: string;
  tags?: string[];
  categories?: string[];
  metadata?: Record<string, any>;
  author?: string;
  publishedAt?: string;
  order?: number;
  isActive?: boolean;
}

// Settings Types
export enum SettingCategory {
  GENERAL = 'GENERAL',
  SEO = 'SEO',
  SOCIAL = 'SOCIAL',
  THEME = 'THEME',
  EMAIL = 'EMAIL',
  ADVANCED = 'ADVANCED',
}

export interface Setting {
  _id: string;
  key: string;
  value: any;
  category: SettingCategory;
  description: string;
  type: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSettingInput {
  key: string;
  value: any;
  category?: SettingCategory;
  description?: string;
  type?: string;
  isPublic?: boolean;
}

export interface UpdateSettingInput {
  value?: any;
  category?: SettingCategory;
  description?: string;
  type?: string;
  isPublic?: boolean;
}

export interface BulkUpdateSettingInput {
  key: string;
  value: any;
}
