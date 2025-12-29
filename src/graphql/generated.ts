/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */
/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  street: Scalars['String']['output'];
  zipCode: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  street: Scalars['String']['input'];
  zipCode: InputMaybe<Scalars['String']['input']>;
};

export type BulkSettingInput = {
  key: Scalars['String']['input'];
  value: Scalars['JSON']['input'];
};

export type Company = {
  __typename?: 'Company';
  _id: Scalars['ID']['output'];
  address: Maybe<Address>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['Float']['output']>;
  deletedBy: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  employees: Maybe<Scalars['Int']['output']>;
  founded: Maybe<Scalars['String']['output']>;
  mission: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vision: Maybe<Scalars['String']['output']>;
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  _id: Scalars['ID']['output'];
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  socialLinks: Maybe<SocialLinks>;
  updatedAt: Scalars['DateTime']['output'];
  workingHours: Maybe<Scalars['String']['output']>;
};

export type ContactMessage = {
  __typename?: 'ContactMessage';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
};

export type Content = {
  __typename?: 'Content';
  _id: Scalars['ID']['output'];
  author: Maybe<Scalars['String']['output']>;
  categories: Maybe<Array<Scalars['String']['output']>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  excerpt: Maybe<Scalars['String']['output']>;
  featuredImage: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  metadata: Maybe<Scalars['JSON']['output']>;
  order: Scalars['Int']['output'];
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  status: ContentStatus;
  tags: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  type: ContentType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ContentStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export enum ContentType {
  Banner = 'BANNER',
  Blog = 'BLOG',
  Menu = 'MENU',
  Page = 'PAGE',
  Post = 'POST'
}

export type CreateCompanyInput = {
  address: InputMaybe<AddressInput>;
  description: Scalars['String']['input'];
  employees: InputMaybe<Scalars['Int']['input']>;
  founded: InputMaybe<Scalars['String']['input']>;
  mission: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  vision: InputMaybe<Scalars['String']['input']>;
};

export type CreateContactMessageInput = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};

export type CreateContentInput = {
  author: InputMaybe<Scalars['String']['input']>;
  categories: InputMaybe<Array<Scalars['String']['input']>>;
  content: InputMaybe<Scalars['String']['input']>;
  excerpt: InputMaybe<Scalars['String']['input']>;
  featuredImage: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  metadata: InputMaybe<Scalars['JSON']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  slug: Scalars['String']['input'];
  status: InputMaybe<ContentStatus>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  type: InputMaybe<ContentType>;
};

export type CreateServiceInput = {
  description: Scalars['String']['input'];
  features: InputMaybe<Array<Scalars['String']['input']>>;
  icon: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  price: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateSettingInput = {
  category: InputMaybe<SettingCategory>;
  description: InputMaybe<Scalars['String']['input']>;
  isPublic: InputMaybe<Scalars['Boolean']['input']>;
  key: Scalars['String']['input'];
  type: InputMaybe<Scalars['String']['input']>;
  value: Scalars['JSON']['input'];
};

export type CreateTeamMemberInput = {
  avatar: Scalars['String']['input'];
  bio: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  phone: InputMaybe<Scalars['String']['input']>;
  position: Scalars['String']['input'];
  skills: InputMaybe<Array<Scalars['String']['input']>>;
  socialLinks: InputMaybe<SocialLinksInput>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty: Maybe<Scalars['String']['output']>;
  bulkDeleteContents: Scalars['Int']['output'];
  bulkUpdateSettings: Scalars['Int']['output'];
  createCompany: Company;
  createContactMessage: ContactMessage;
  createContent: Content;
  createService: Service;
  createSetting: Setting;
  createTeamMember: TeamMember;
  createUser: User;
  deleteContent: Scalars['Boolean']['output'];
  deleteSetting: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  initializeDefaultSettings: Scalars['Boolean']['output'];
  markAsRead: ContactMessage;
  removeCompany: Scalars['Boolean']['output'];
  removeService: Scalars['Boolean']['output'];
  removeTeamMember: Scalars['Boolean']['output'];
  updateCompany: Company;
  updateContactInfo: ContactInfo;
  updateContent: Content;
  updateService: Service;
  updateSetting: Setting;
  updateTeamMember: TeamMember;
  updateUser: User;
};


export type MutationBulkDeleteContentsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationBulkUpdateSettingsArgs = {
  settings: Array<BulkSettingInput>;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateContactMessageArgs = {
  input: CreateContactMessageInput;
};


export type MutationCreateContentArgs = {
  input: CreateContentInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationCreateSettingArgs = {
  input: CreateSettingInput;
};


export type MutationCreateTeamMemberArgs = {
  input: CreateTeamMemberInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSettingArgs = {
  key: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMarkAsReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveServiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTeamMemberArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCompanyArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCompanyInput;
};


export type MutationUpdateContactInfoArgs = {
  input: UpdateContactInfoInput;
};


export type MutationUpdateContentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateContentInput;
};


export type MutationUpdateServiceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateServiceInput;
};


export type MutationUpdateSettingArgs = {
  input: UpdateSettingInput;
  key: Scalars['String']['input'];
};


export type MutationUpdateTeamMemberArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTeamMemberInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type PaginatedContent = {
  __typename?: 'PaginatedContent';
  data: Maybe<Array<Maybe<Content>>>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  _empty: Maybe<Scalars['String']['output']>;
  allSettingsAsObject: Scalars['JSON']['output'];
  companies: Array<Company>;
  company: Company;
  contactInfo: ContactInfo;
  contactMessage: ContactMessage;
  contactMessages: Array<ContactMessage>;
  content: Content;
  contentBySlug: Content;
  contents: PaginatedContent;
  me: User;
  publicSettings: Scalars['JSON']['output'];
  service: Service;
  services: Array<Service>;
  setting: Setting;
  settings: Array<Setting>;
  teamMember: TeamMember;
  teamMembers: Array<TeamMember>;
  user: User;
  users: Array<User>;
};


export type QueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactMessageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContentBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryContentsArgs = {
  query: InputMaybe<QueryContentInput>;
};


export type QueryServiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServicesArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySettingArgs = {
  key: Scalars['String']['input'];
};


export type QuerySettingsArgs = {
  category: InputMaybe<SettingCategory>;
};


export type QueryTeamMemberArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTeamMembersArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryContentInput = {
  limit: InputMaybe<Scalars['Int']['input']>;
  page: InputMaybe<Scalars['Int']['input']>;
  search: InputMaybe<Scalars['String']['input']>;
  sortBy: InputMaybe<Scalars['String']['input']>;
  sortOrder: InputMaybe<Scalars['String']['input']>;
  status: InputMaybe<ContentStatus>;
  type: InputMaybe<ContentType>;
};

export type Service = {
  __typename?: 'Service';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  features: Array<Scalars['String']['output']>;
  icon: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  price: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Setting = {
  __typename?: 'Setting';
  _id: Scalars['ID']['output'];
  category: SettingCategory;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  isPublic: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['JSON']['output'];
};

export enum SettingCategory {
  Advanced = 'ADVANCED',
  Email = 'EMAIL',
  General = 'GENERAL',
  Seo = 'SEO',
  Social = 'SOCIAL',
  Theme = 'THEME'
}

export type SocialLinks = {
  __typename?: 'SocialLinks';
  facebook: Maybe<Scalars['String']['output']>;
  github: Maybe<Scalars['String']['output']>;
  linkedin: Maybe<Scalars['String']['output']>;
  twitter: Maybe<Scalars['String']['output']>;
};

export type SocialLinksInput = {
  facebook: InputMaybe<Scalars['String']['input']>;
  github: InputMaybe<Scalars['String']['input']>;
  linkedin: InputMaybe<Scalars['String']['input']>;
  twitter: InputMaybe<Scalars['String']['input']>;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  _id: Scalars['ID']['output'];
  avatar: Scalars['String']['output'];
  bio: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
  position: Scalars['String']['output'];
  skills: Array<Scalars['String']['output']>;
  socialLinks: Maybe<SocialLinks>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateCompanyInput = {
  address: InputMaybe<AddressInput>;
  description: InputMaybe<Scalars['String']['input']>;
  employees: InputMaybe<Scalars['Int']['input']>;
  founded: InputMaybe<Scalars['String']['input']>;
  mission: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  vision: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactInfoInput = {
  address: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
  socialLinks: InputMaybe<SocialLinksInput>;
  workingHours: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContentInput = {
  author: InputMaybe<Scalars['String']['input']>;
  categories: InputMaybe<Array<Scalars['String']['input']>>;
  content: InputMaybe<Scalars['String']['input']>;
  excerpt: InputMaybe<Scalars['String']['input']>;
  featuredImage: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  metadata: InputMaybe<Scalars['JSON']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
  status: InputMaybe<ContentStatus>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  title: InputMaybe<Scalars['String']['input']>;
  type: InputMaybe<ContentType>;
};

export type UpdateServiceInput = {
  description: InputMaybe<Scalars['String']['input']>;
  features: InputMaybe<Array<Scalars['String']['input']>>;
  icon: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  price: InputMaybe<Scalars['String']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSettingInput = {
  category: InputMaybe<SettingCategory>;
  description: InputMaybe<Scalars['String']['input']>;
  isPublic: InputMaybe<Scalars['Boolean']['input']>;
  type: InputMaybe<Scalars['String']['input']>;
  value: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateTeamMemberInput = {
  avatar: InputMaybe<Scalars['String']['input']>;
  bio: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
  position: InputMaybe<Scalars['String']['input']>;
  skills: InputMaybe<Array<Scalars['String']['input']>>;
  socialLinks: InputMaybe<SocialLinksInput>;
};

export type UpdateUserInput = {
  email: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  password: InputMaybe<Scalars['String']['input']>;
  role: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, email: string, name: string, role: string, isActive: boolean, createdAt: any, updatedAt: any } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string, email: string, name: string, role: string, isActive: boolean, createdAt: any, updatedAt: any } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type CreateContentMutationVariables = Exact<{
  input: CreateContentInput;
}>;


export type CreateContentMutation = { __typename?: 'Mutation', createContent: { __typename?: 'Content', _id: string, title: string, slug: string, content: string, excerpt: string | null, type: ContentType, status: ContentStatus, featuredImage: string | null, tags: Array<string> | null, categories: Array<string> | null, metadata: any | null, author: string | null, publishedAt: any | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type UpdateContentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateContentInput;
}>;


export type UpdateContentMutation = { __typename?: 'Mutation', updateContent: { __typename?: 'Content', _id: string, title: string, slug: string, content: string, excerpt: string | null, type: ContentType, status: ContentStatus, featuredImage: string | null, tags: Array<string> | null, categories: Array<string> | null, metadata: any | null, author: string | null, publishedAt: any | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type DeleteContentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteContentMutation = { __typename?: 'Mutation', deleteContent: boolean };

export type BulkDeleteContentsMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type BulkDeleteContentsMutation = { __typename?: 'Mutation', bulkDeleteContents: number };

export type CreateSettingMutationVariables = Exact<{
  input: CreateSettingInput;
}>;


export type CreateSettingMutation = { __typename?: 'Mutation', createSetting: { __typename?: 'Setting', _id: string, key: string, value: any, category: SettingCategory, description: string | null, type: string, isPublic: boolean, createdAt: any, updatedAt: any } };

export type UpdateSettingMutationVariables = Exact<{
  key: Scalars['String']['input'];
  input: UpdateSettingInput;
}>;


export type UpdateSettingMutation = { __typename?: 'Mutation', updateSetting: { __typename?: 'Setting', _id: string, key: string, value: any, category: SettingCategory, description: string | null, type: string, isPublic: boolean, createdAt: any, updatedAt: any } };

export type DeleteSettingMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type DeleteSettingMutation = { __typename?: 'Mutation', deleteSetting: boolean };

export type BulkUpdateSettingsMutationVariables = Exact<{
  settings: Array<BulkSettingInput> | BulkSettingInput;
}>;


export type BulkUpdateSettingsMutation = { __typename?: 'Mutation', bulkUpdateSettings: number };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: string, email: string, name: string, role: string, isActive: boolean, createdAt: any, updatedAt: any }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, email: string, name: string, role: string, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, email: string, name: string, role: string, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetContentsQueryVariables = Exact<{
  query: QueryContentInput;
}>;


export type GetContentsQuery = { __typename?: 'Query', contents: { __typename?: 'PaginatedContent', total: number, page: number, limit: number, totalPages: number, data: Array<{ __typename?: 'Content', _id: string, title: string, slug: string, content: string, excerpt: string | null, type: ContentType, status: ContentStatus, featuredImage: string | null, tags: Array<string> | null, categories: Array<string> | null, metadata: any | null, author: string | null, publishedAt: any | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } | null> | null } };

export type GetContentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetContentQuery = { __typename?: 'Query', content: { __typename?: 'Content', _id: string, title: string, slug: string, content: string, excerpt: string | null, type: ContentType, status: ContentStatus, featuredImage: string | null, tags: Array<string> | null, categories: Array<string> | null, metadata: any | null, author: string | null, publishedAt: any | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetContentBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetContentBySlugQuery = { __typename?: 'Query', contentBySlug: { __typename?: 'Content', _id: string, title: string, slug: string, content: string, excerpt: string | null, type: ContentType, status: ContentStatus, featuredImage: string | null, tags: Array<string> | null, categories: Array<string> | null, metadata: any | null, author: string | null, publishedAt: any | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetSettingsQueryVariables = Exact<{
  category: InputMaybe<SettingCategory>;
}>;


export type GetSettingsQuery = { __typename?: 'Query', settings: Array<{ __typename?: 'Setting', _id: string, key: string, value: any, category: SettingCategory, description: string | null, type: string, isPublic: boolean, createdAt: any, updatedAt: any }> };

export type GetSettingQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type GetSettingQuery = { __typename?: 'Query', setting: { __typename?: 'Setting', _id: string, key: string, value: any, category: SettingCategory, description: string | null, type: string, isPublic: boolean, createdAt: any, updatedAt: any } };

export type GetPublicSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicSettingsQuery = { __typename?: 'Query', publicSettings: any };
