import {
  LucideIcon,
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  FolderOpen,
  FilePlus,
  Tags,
  Globe,
  Settings2,
  Briefcase,
  Navigation,
  Share2,
  Code,
  Clock,
  Tag,
  FolderKanban,
  BookOpen,
} from 'lucide-react';
import { NAVIGATION_ROUTES } from '@/constants/routes';

export interface NavigationItem {
  name: string;
  translationKey: string;
  href: string;
  icon: LucideIcon;
  children?: NavigationChild[];
}

export interface NavigationChild {
  name: string;
  translationKey: string;
  href: string;
  icon?: LucideIcon;
}

export const navigationConfig: NavigationItem[] = [
  {
    name: 'Dashboard',
    translationKey: 'nav.dashboard',
    href: NAVIGATION_ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    name: 'Content',
    translationKey: 'nav.content',
    href: NAVIGATION_ROUTES.CONTENT,
    icon: FileText,
    children: [
      {
        name: 'All Content',
        translationKey: 'nav.allContent',
        href: NAVIGATION_ROUTES.CONTENT,
        icon: FolderOpen,
      },
      {
        name: 'Create New',
        translationKey: 'nav.createNew',
        href: NAVIGATION_ROUTES.CONTENT_CREATE,
        icon: FilePlus,
      },
      {
        name: 'Categories',
        translationKey: 'nav.categories',
        href: NAVIGATION_ROUTES.CONTENT_CATEGORIES,
        icon: Tags,
      },
    ],
  },
  {
    name: 'Portfolio',
    translationKey: 'nav.portfolio',
    href: NAVIGATION_ROUTES.PORTFOLIO,
    icon: Briefcase,
    children: [
      {
        name: 'Navigation',
        translationKey: 'nav.navigation',
        href: NAVIGATION_ROUTES.PORTFOLIO_NAVIGATION,
        icon: Navigation,
      },
      {
        name: 'Social Links',
        translationKey: 'nav.socialLinks',
        href: NAVIGATION_ROUTES.PORTFOLIO_SOCIAL_LINKS,
        icon: Share2,
      },
      {
        name: 'Skills',
        translationKey: 'nav.skills',
        href: NAVIGATION_ROUTES.PORTFOLIO_SKILLS,
        icon: Code,
      },
      {
        name: 'Work Experience',
        translationKey: 'nav.workExperience',
        href: NAVIGATION_ROUTES.PORTFOLIO_WORK_EXPERIENCES,
        icon: Clock,
      },
      {
        name: 'Tags',
        translationKey: 'nav.tags',
        href: NAVIGATION_ROUTES.PORTFOLIO_TAGS,
        icon: Tag,
      },
      {
        name: 'Projects',
        translationKey: 'nav.projects',
        href: NAVIGATION_ROUTES.PORTFOLIO_PROJECTS,
        icon: FolderKanban,
      },
      {
        name: 'Articles',
        translationKey: 'nav.articles',
        href: NAVIGATION_ROUTES.PORTFOLIO_ARTICLES,
        icon: BookOpen,
      },
    ],
  },
  {
    name: 'Media',
    translationKey: 'nav.media',
    href: NAVIGATION_ROUTES.MEDIA,
    icon: Image,
  },
  {
    name: 'Settings',
    translationKey: 'nav.settings',
    href: NAVIGATION_ROUTES.SETTINGS,
    icon: Settings,
    children: [
      {
        name: 'Manage Settings',
        translationKey: 'nav.manageSettings',
        href: NAVIGATION_ROUTES.SETTINGS_MANAGE,
        icon: Settings2,
      },
      {
        name: 'Public Settings',
        translationKey: 'nav.publicSettings',
        href: NAVIGATION_ROUTES.SETTINGS_PUBLIC,
        icon: Globe,
      },
    ],
  },
];
