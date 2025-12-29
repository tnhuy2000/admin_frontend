import { LucideIcon, LayoutDashboard, FileText, Image, Settings, FolderOpen, FilePlus, Tags } from 'lucide-react';
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
  },
];
