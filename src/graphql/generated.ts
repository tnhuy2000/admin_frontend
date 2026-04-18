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

export type Article = {
  __typename?: 'Article';
  _id: Scalars['ID']['output'];
  author: Maybe<Scalars['String']['output']>;
  categories: Array<Scalars['String']['output']>;
  content: Maybe<Scalars['String']['output']>;
  coverImage: Maybe<LinkDocument>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  excerpt: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  isFeatured: Scalars['Boolean']['output'];
  order: Scalars['Int']['output'];
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  readingTime: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  status: ArticleStatus;
  tags: Array<Scalars['String']['output']>;
  thumbnail: Maybe<LinkDocument>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  views: Scalars['Int']['output'];
};

export enum ArticleStatus {
  Archived = 'archived',
  Draft = 'draft',
  Published = 'published'
}

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

export type CreateArticleInput = {
  author: InputMaybe<Scalars['String']['input']>;
  categories: InputMaybe<Array<Scalars['String']['input']>>;
  content: InputMaybe<Scalars['String']['input']>;
  coverImage: InputMaybe<LinkDocumentInput>;
  description: InputMaybe<Scalars['String']['input']>;
  excerpt: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readingTime: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
  status: InputMaybe<ArticleStatus>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail: InputMaybe<LinkDocumentInput>;
  title: Scalars['String']['input'];
};

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

export type CreateNavigationInput = {
  href: Scalars['String']['input'];
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  label: Scalars['String']['input'];
  order: InputMaybe<Scalars['Int']['input']>;
};

export type CreateProjectInput = {
  content: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  endDate: InputMaybe<Scalars['DateTime']['input']>;
  excerpt: InputMaybe<Scalars['String']['input']>;
  images: InputMaybe<Array<ProjectImageInput>>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  links: InputMaybe<Array<ProjectLinkInput>>;
  order: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
  startDate: InputMaybe<Scalars['DateTime']['input']>;
  status: InputMaybe<ProjectStatus>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  technologies: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail: InputMaybe<LinkDocumentInput>;
  title: Scalars['String']['input'];
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

export type CreateSkillInput = {
  description: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  items: InputMaybe<Array<SkillItemInput>>;
  order: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  variant: SkillVariant;
};

export type CreateSocialLinkInput = {
  href: Scalars['String']['input'];
  icon: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  label: Scalars['String']['input'];
  order: InputMaybe<Scalars['Int']['input']>;
  platform: SocialPlatform;
};

export type CreateTagInput = {
  color: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  order: InputMaybe<Scalars['Int']['input']>;
  slug: Scalars['String']['input'];
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

export type CreateWorkExperienceInput = {
  company: Scalars['String']['input'];
  duration: Scalars['String']['input'];
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isHighlighted: InputMaybe<Scalars['Boolean']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  period: Scalars['String']['input'];
  position: Scalars['String']['input'];
  technologies: Scalars['String']['input'];
};

export type LinkDocument = {
  __typename?: 'LinkDocument';
  fileName: Maybe<Scalars['String']['output']>;
  type: Maybe<TypeDocument>;
  url: Maybe<Scalars['String']['output']>;
};

export type LinkDocumentInput = {
  fileName: InputMaybe<Scalars['String']['input']>;
  type: InputMaybe<TypeDocument>;
  url: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty: Maybe<Scalars['String']['output']>;
  bulkDeleteContents: Scalars['Int']['output'];
  bulkUpdateSettings: Scalars['Int']['output'];
  createArticle: Article;
  createCompany: Company;
  createContactMessage: ContactMessage;
  createContent: Content;
  createNavigation: Navigation;
  createProject: Project;
  createService: Service;
  createSetting: Setting;
  createSkill: Skill;
  createSocialLink: SocialLink;
  createTag: Tag;
  createTeamMember: TeamMember;
  createUser: User;
  createWorkExperience: WorkExperience;
  deleteArticle: Scalars['Boolean']['output'];
  deleteContent: Scalars['Boolean']['output'];
  deleteNavigation: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteSetting: Scalars['Boolean']['output'];
  deleteSkill: Scalars['Boolean']['output'];
  deleteSocialLink: Scalars['Boolean']['output'];
  deleteTag: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteWorkExperience: Scalars['Boolean']['output'];
  incrementArticleViews: Article;
  initializeDefaultSettings: Scalars['Boolean']['output'];
  markAsRead: ContactMessage;
  removeCompany: Scalars['Boolean']['output'];
  removeService: Scalars['Boolean']['output'];
  removeTeamMember: Scalars['Boolean']['output'];
  updateArticle: Article;
  updateCompany: Company;
  updateContactInfo: ContactInfo;
  updateContent: Content;
  updateNavigation: Navigation;
  updateProject: Project;
  updateService: Service;
  updateSetting: Setting;
  updateSkill: Skill;
  updateSocialLink: SocialLink;
  updateTag: Tag;
  updateTeamMember: TeamMember;
  updateUser: User;
  updateWorkExperience: WorkExperience;
};


export type MutationBulkDeleteContentsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationBulkUpdateSettingsArgs = {
  settings: Array<BulkSettingInput>;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
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


export type MutationCreateNavigationArgs = {
  input: CreateNavigationInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationCreateSettingArgs = {
  input: CreateSettingInput;
};


export type MutationCreateSkillArgs = {
  input: CreateSkillInput;
};


export type MutationCreateSocialLinkArgs = {
  input: CreateSocialLinkInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateTeamMemberArgs = {
  input: CreateTeamMemberInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkExperienceArgs = {
  input: CreateWorkExperienceInput;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNavigationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSettingArgs = {
  key: Scalars['String']['input'];
};


export type MutationDeleteSkillArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSocialLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorkExperienceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationIncrementArticleViewsArgs = {
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


export type MutationUpdateArticleArgs = {
  id: Scalars['ID']['input'];
  input: UpdateArticleInput;
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


export type MutationUpdateNavigationArgs = {
  id: Scalars['ID']['input'];
  input: UpdateNavigationInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};


export type MutationUpdateServiceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateServiceInput;
};


export type MutationUpdateSettingArgs = {
  input: InputMaybe<UpdateSettingInput>;
  key: Scalars['String']['input'];
};


export type MutationUpdateSkillArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSkillInput;
};


export type MutationUpdateSocialLinkArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSocialLinkInput;
};


export type MutationUpdateTagArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTagInput;
};


export type MutationUpdateTeamMemberArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTeamMemberInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};


export type MutationUpdateWorkExperienceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWorkExperienceInput;
};

export type Navigation = {
  __typename?: 'Navigation';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  href: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PaginatedContent = {
  __typename?: 'PaginatedContent';
  data: Maybe<Array<Maybe<Content>>>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID']['output'];
  content: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  excerpt: Maybe<Scalars['String']['output']>;
  images: Array<ProjectImage>;
  isActive: Scalars['Boolean']['output'];
  isFeatured: Scalars['Boolean']['output'];
  links: Array<ProjectLink>;
  order: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  startDate: Maybe<Scalars['DateTime']['output']>;
  status: ProjectStatus;
  tags: Array<Scalars['String']['output']>;
  technologies: Array<Scalars['String']['output']>;
  thumbnail: Maybe<LinkDocument>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectImage = {
  __typename?: 'ProjectImage';
  alt: Maybe<Scalars['String']['output']>;
  isFeatured: Scalars['Boolean']['output'];
  order: Scalars['Int']['output'];
  url: Maybe<LinkDocument>;
};

export type ProjectImageInput = {
  alt: InputMaybe<Scalars['String']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  url: InputMaybe<LinkDocumentInput>;
};

export type ProjectLink = {
  __typename?: 'ProjectLink';
  label: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ProjectLinkInput = {
  label: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export enum ProjectStatus {
  Archived = 'archived',
  Draft = 'draft',
  Published = 'published'
}

export type Query = {
  __typename?: 'Query';
  _empty: Maybe<Scalars['String']['output']>;
  allSettingsAsObject: Scalars['JSON']['output'];
  article: Article;
  articleBySlug: Article;
  articles: Array<Article>;
  companies: Array<Company>;
  company: Company;
  contactInfo: ContactInfo;
  contactMessage: ContactMessage;
  contactMessages: Array<ContactMessage>;
  content: Content;
  contentBySlug: Content;
  contents: PaginatedContent;
  getPublicSettings: Array<Setting>;
  me: User;
  navigation: Navigation;
  navigations: Array<Navigation>;
  project: Project;
  projectBySlug: Project;
  projects: Array<Project>;
  service: Service;
  services: Array<Service>;
  setting: Setting;
  settings: Array<Setting>;
  skill: Skill;
  skills: Array<Skill>;
  socialLink: SocialLink;
  socialLinks: Array<SocialLink>;
  tag: Tag;
  tagBySlug: Tag;
  tags: Array<Tag>;
  teamMember: TeamMember;
  teamMembers: Array<TeamMember>;
  user: User;
  users: Array<User>;
  workExperience: WorkExperience;
  workExperiences: Array<WorkExperience>;
};


export type QueryArticleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryArticleBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryArticlesArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  status: InputMaybe<ArticleStatus>;
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


export type QueryNavigationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNavigationsArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProjectsArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  status: InputMaybe<ProjectStatus>;
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


export type QuerySkillArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySkillsArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySocialLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySocialLinksArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTagArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTagBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryTagsArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
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


export type QueryWorkExperienceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkExperiencesArgs = {
  isActive: InputMaybe<Scalars['Boolean']['input']>;
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
  isDefault: Maybe<Scalars['Boolean']['output']>;
  isPublic: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['JSON']['output'];
};

export enum SettingCategory {
  Advanced = 'ADVANCED',
  Contact = 'CONTACT',
  Content = 'CONTENT',
  General = 'GENERAL',
  Seo = 'SEO',
  Social = 'SOCIAL',
  Theme = 'THEME'
}

export type Skill = {
  __typename?: 'Skill';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  items: Array<SkillItem>;
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variant: SkillVariant;
};

export type SkillItem = {
  __typename?: 'SkillItem';
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

export type SkillItemInput = {
  name: Scalars['String']['input'];
  order: InputMaybe<Scalars['Int']['input']>;
};

export enum SkillVariant {
  Backend = 'backend',
  Devops = 'devops',
  Frontend = 'frontend',
  Styles = 'styles'
}

export type SocialLink = {
  __typename?: 'SocialLink';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  href: Scalars['String']['output'];
  icon: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  platform: SocialPlatform;
  updatedAt: Scalars['DateTime']['output'];
};

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

export enum SocialPlatform {
  Email = 'email',
  Facebook = 'facebook',
  Github = 'github',
  Instagram = 'instagram',
  Linkedin = 'linkedin',
  Other = 'other',
  Telegram = 'telegram',
  Twitter = 'twitter',
  Youtube = 'youtube'
}

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID']['output'];
  color: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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

export enum TypeDocument {
  File = 'file',
  Link = 'link'
}

export type UpdateArticleInput = {
  author: InputMaybe<Scalars['String']['input']>;
  categories: InputMaybe<Array<Scalars['String']['input']>>;
  content: InputMaybe<Scalars['String']['input']>;
  coverImage: InputMaybe<LinkDocumentInput>;
  description: InputMaybe<Scalars['String']['input']>;
  excerpt: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  readingTime: InputMaybe<Scalars['Int']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
  status: InputMaybe<ArticleStatus>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail: InputMaybe<LinkDocumentInput>;
  title: InputMaybe<Scalars['String']['input']>;
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

export type UpdateNavigationInput = {
  href: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  label: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProjectInput = {
  content: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  endDate: InputMaybe<Scalars['DateTime']['input']>;
  excerpt: InputMaybe<Scalars['String']['input']>;
  images: InputMaybe<Array<ProjectImageInput>>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  links: InputMaybe<Array<ProjectLinkInput>>;
  order: InputMaybe<Scalars['Int']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
  startDate: InputMaybe<Scalars['DateTime']['input']>;
  status: InputMaybe<ProjectStatus>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
  technologies: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnail: InputMaybe<LinkDocumentInput>;
  title: InputMaybe<Scalars['String']['input']>;
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

export type UpdateSkillInput = {
  description: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  items: InputMaybe<Array<SkillItemInput>>;
  order: InputMaybe<Scalars['Int']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
  variant: InputMaybe<SkillVariant>;
};

export type UpdateSocialLinkInput = {
  href: InputMaybe<Scalars['String']['input']>;
  icon: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  label: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  platform: InputMaybe<SocialPlatform>;
};

export type UpdateTagInput = {
  color: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  slug: InputMaybe<Scalars['String']['input']>;
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

export type UpdateWorkExperienceInput = {
  company: InputMaybe<Scalars['String']['input']>;
  duration: InputMaybe<Scalars['String']['input']>;
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isHighlighted: InputMaybe<Scalars['Boolean']['input']>;
  order: InputMaybe<Scalars['Int']['input']>;
  period: InputMaybe<Scalars['String']['input']>;
  position: InputMaybe<Scalars['String']['input']>;
  technologies: InputMaybe<Scalars['String']['input']>;
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

export type WorkExperience = {
  __typename?: 'WorkExperience';
  _id: Scalars['ID']['output'];
  company: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isHighlighted: Scalars['Boolean']['output'];
  order: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  position: Scalars['String']['output'];
  technologies: Scalars['String']['output'];
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
  input: InputMaybe<UpdateSettingInput>;
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

export type CreateNavigationMutationVariables = Exact<{
  input: CreateNavigationInput;
}>;


export type CreateNavigationMutation = { __typename?: 'Mutation', createNavigation: { __typename?: 'Navigation', _id: string, label: string, href: string, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type UpdateNavigationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateNavigationInput;
}>;


export type UpdateNavigationMutation = { __typename?: 'Mutation', updateNavigation: { __typename?: 'Navigation', _id: string, label: string, href: string, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type DeleteNavigationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteNavigationMutation = { __typename?: 'Mutation', deleteNavigation: boolean };

export type CreateSocialLinkMutationVariables = Exact<{
  input: CreateSocialLinkInput;
}>;


export type CreateSocialLinkMutation = { __typename?: 'Mutation', createSocialLink: { __typename?: 'SocialLink', _id: string, platform: SocialPlatform, label: string, href: string, icon: string | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type UpdateSocialLinkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateSocialLinkInput;
}>;


export type UpdateSocialLinkMutation = { __typename?: 'Mutation', updateSocialLink: { __typename?: 'SocialLink', _id: string, platform: SocialPlatform, label: string, href: string, icon: string | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type DeleteSocialLinkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSocialLinkMutation = { __typename?: 'Mutation', deleteSocialLink: boolean };

export type CreateSkillMutationVariables = Exact<{
  input: CreateSkillInput;
}>;


export type CreateSkillMutation = { __typename?: 'Mutation', createSkill: { __typename?: 'Skill', _id: string, title: string, description: string | null, variant: SkillVariant, order: number, isActive: boolean, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'SkillItem', name: string, order: number }> } };

export type UpdateSkillMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateSkillInput;
}>;


export type UpdateSkillMutation = { __typename?: 'Mutation', updateSkill: { __typename?: 'Skill', _id: string, title: string, description: string | null, variant: SkillVariant, order: number, isActive: boolean, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'SkillItem', name: string, order: number }> } };

export type DeleteSkillMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSkillMutation = { __typename?: 'Mutation', deleteSkill: boolean };

export type CreateWorkExperienceMutationVariables = Exact<{
  input: CreateWorkExperienceInput;
}>;


export type CreateWorkExperienceMutation = { __typename?: 'Mutation', createWorkExperience: { __typename?: 'WorkExperience', _id: string, period: string, duration: string, company: string, position: string, technologies: string, isHighlighted: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type UpdateWorkExperienceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateWorkExperienceInput;
}>;


export type UpdateWorkExperienceMutation = { __typename?: 'Mutation', updateWorkExperience: { __typename?: 'WorkExperience', _id: string, period: string, duration: string, company: string, position: string, technologies: string, isHighlighted: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type DeleteWorkExperienceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWorkExperienceMutation = { __typename?: 'Mutation', deleteWorkExperience: boolean };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', _id: string, name: string, slug: string, description: string | null, color: string | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateTagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', _id: string, name: string, slug: string, description: string | null, color: string | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: boolean };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', _id: string, title: string, slug: string, description: string | null, content: string | null, excerpt: string | null, tags: Array<string>, technologies: Array<string>, status: ProjectStatus, startDate: any | null, endDate: any | null, isFeatured: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any, thumbnail: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null, images: Array<{ __typename?: 'ProjectImage', alt: string | null, isFeatured: boolean, order: number, url: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null }>, links: Array<{ __typename?: 'ProjectLink', type: string, url: string, label: string | null }> } };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', _id: string, title: string, slug: string, description: string | null, content: string | null, excerpt: string | null, tags: Array<string>, technologies: Array<string>, status: ProjectStatus, startDate: any | null, endDate: any | null, isFeatured: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any, thumbnail: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null, images: Array<{ __typename?: 'ProjectImage', alt: string | null, isFeatured: boolean, order: number, url: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null }>, links: Array<{ __typename?: 'ProjectLink', type: string, url: string, label: string | null }> } };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type CreateArticleMutationVariables = Exact<{
  input: CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', _id: string, title: string, slug: string, description: string | null, content: string | null, excerpt: string | null, tags: Array<string>, categories: Array<string>, status: ArticleStatus, publishedAt: any | null, author: string | null, readingTime: number, views: number, isFeatured: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any, thumbnail: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null, coverImage: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null } };

export type UpdateArticleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateArticleInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', _id: string, title: string, slug: string, description: string | null, content: string | null, excerpt: string | null, tags: Array<string>, categories: Array<string>, status: ArticleStatus, publishedAt: any | null, author: string | null, readingTime: number, views: number, isFeatured: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any, thumbnail: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null, coverImage: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null } };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: boolean };

export type IncrementArticleViewsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type IncrementArticleViewsMutation = { __typename?: 'Mutation', incrementArticleViews: { __typename?: 'Article', _id: string, views: number } };

export type GetNavigationsQueryVariables = Exact<{
  isActive: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetNavigationsQuery = { __typename?: 'Query', navigations: Array<{ __typename?: 'Navigation', _id: string, label: string, href: string, order: number, isActive: boolean, createdAt: any, updatedAt: any }> };

export type GetNavigationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetNavigationQuery = { __typename?: 'Query', navigation: { __typename?: 'Navigation', _id: string, label: string, href: string, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetSocialLinksQueryVariables = Exact<{
  isActive: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetSocialLinksQuery = { __typename?: 'Query', socialLinks: Array<{ __typename?: 'SocialLink', _id: string, platform: SocialPlatform, label: string, href: string, icon: string | null, order: number, isActive: boolean, createdAt: any, updatedAt: any }> };

export type GetSocialLinkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSocialLinkQuery = { __typename?: 'Query', socialLink: { __typename?: 'SocialLink', _id: string, platform: SocialPlatform, label: string, href: string, icon: string | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetSkillsQueryVariables = Exact<{
  isActive: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetSkillsQuery = { __typename?: 'Query', skills: Array<{ __typename?: 'Skill', _id: string, title: string, description: string | null, variant: SkillVariant, order: number, isActive: boolean, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'SkillItem', name: string, order: number }> }> };

export type GetSkillQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSkillQuery = { __typename?: 'Query', skill: { __typename?: 'Skill', _id: string, title: string, description: string | null, variant: SkillVariant, order: number, isActive: boolean, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'SkillItem', name: string, order: number }> } };

export type GetWorkExperiencesQueryVariables = Exact<{
  isActive: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetWorkExperiencesQuery = { __typename?: 'Query', workExperiences: Array<{ __typename?: 'WorkExperience', _id: string, period: string, duration: string, company: string, position: string, technologies: string, isHighlighted: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any }> };

export type GetWorkExperienceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetWorkExperienceQuery = { __typename?: 'Query', workExperience: { __typename?: 'WorkExperience', _id: string, period: string, duration: string, company: string, position: string, technologies: string, isHighlighted: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetTagsQueryVariables = Exact<{
  isActive: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', _id: string, name: string, slug: string, description: string | null, color: string | null, order: number, isActive: boolean, createdAt: any, updatedAt: any }> };

export type GetTagQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTagQuery = { __typename?: 'Query', tag: { __typename?: 'Tag', _id: string, name: string, slug: string, description: string | null, color: string | null, order: number, isActive: boolean, createdAt: any, updatedAt: any } };

export type GetProjectsQueryVariables = Exact<{
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  status: InputMaybe<ProjectStatus>;
}>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', _id: string, title: string, slug: string, description: string | null, content: string | null, excerpt: string | null, tags: Array<string>, technologies: Array<string>, status: ProjectStatus, startDate: any | null, endDate: any | null, isFeatured: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any, thumbnail: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null, images: Array<{ __typename?: 'ProjectImage', alt: string | null, isFeatured: boolean, order: number, url: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null }>, links: Array<{ __typename?: 'ProjectLink', type: string, url: string, label: string | null }> }> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', _id: string, title: string, slug: string, description: string | null, content: string | null, excerpt: string | null, tags: Array<string>, technologies: Array<string>, status: ProjectStatus, startDate: any | null, endDate: any | null, isFeatured: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any, thumbnail: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null, images: Array<{ __typename?: 'ProjectImage', alt: string | null, isFeatured: boolean, order: number, url: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null }>, links: Array<{ __typename?: 'ProjectLink', type: string, url: string, label: string | null }> } };

export type GetArticlesQueryVariables = Exact<{
  isActive: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured: InputMaybe<Scalars['Boolean']['input']>;
  status: InputMaybe<ArticleStatus>;
}>;


export type GetArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', _id: string, title: string, slug: string, description: string | null, content: string | null, excerpt: string | null, tags: Array<string>, categories: Array<string>, status: ArticleStatus, publishedAt: any | null, author: string | null, readingTime: number, views: number, isFeatured: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any, thumbnail: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null, coverImage: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null }> };

export type GetArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', _id: string, title: string, slug: string, description: string | null, content: string | null, excerpt: string | null, tags: Array<string>, categories: Array<string>, status: ArticleStatus, publishedAt: any | null, author: string | null, readingTime: number, views: number, isFeatured: boolean, order: number, isActive: boolean, createdAt: any, updatedAt: any, thumbnail: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null, coverImage: { __typename?: 'LinkDocument', url: string | null, fileName: string | null, type: TypeDocument | null } | null } };

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


export type GetSettingsQuery = { __typename?: 'Query', settings: Array<{ __typename?: 'Setting', _id: string, key: string, value: any, category: SettingCategory, description: string | null, type: string, isPublic: boolean, isDefault: boolean | null, createdAt: any, updatedAt: any }> };

export type SettingQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type SettingQuery = { __typename?: 'Query', setting: { __typename?: 'Setting', _id: string, key: string, value: any, category: SettingCategory, description: string | null, type: string, isPublic: boolean, isDefault: boolean | null, createdAt: any, updatedAt: any } };

export type GetPublicSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicSettingsQuery = { __typename?: 'Query', getPublicSettings: Array<{ __typename?: 'Setting', _id: string, key: string, value: any, category: SettingCategory, description: string | null, type: string, isPublic: boolean, isDefault: boolean | null, createdAt: any, updatedAt: any }> };
