import { usePublicSettings } from '@/contexts/PublicSettingsContext';
import type { LinkDocument } from '@/graphql/generated';

/**
 * Custom hook to get a single public setting value
 * @param key - Setting key (e.g., 'SITE_NAME', 'SITE_LOGO')
 * @param defaultValue - Default value if setting not found
 * @returns Setting value or default
 */
export const usePublicSetting = <T = any>(key: string, defaultValue?: T): T => {
  const { getSetting } = usePublicSettings();
  return getSetting(key, defaultValue) as T;
};

/**
 * Hook to get a LinkDocument setting (IMAGE or FILE type)
 * @param key - Setting key
 * @returns LinkDocument or null
 */
export const usePublicLinkDocument = (key: string): LinkDocument | null => {
  const value = usePublicSetting(key);

  if (!value) return null;

  // If already LinkDocument, return it
  if (typeof value === 'object' && 'url' in value) {
    return value as LinkDocument;
  }

  // If string URL (old format), convert to LinkDocument
  if (typeof value === 'string') {
    return {
      url: value,
      fileName: null,
      type: null,
    } as LinkDocument;
  }

  return null;
};

/**
 * Hook to get the URL from a LinkDocument setting
 * @param key - Setting key
 * @param defaultUrl - Default URL if not found
 * @returns URL string or default
 */
export const usePublicSettingUrl = (key: string, defaultUrl: string = ''): string => {
  const linkDoc = usePublicLinkDocument(key);
  return linkDoc?.url || defaultUrl;
};
