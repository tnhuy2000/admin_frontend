import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apolloClient } from '@/services/graphql/client';
import { GET_PUBLIC_SETTINGS } from '@/codegen/graphql-definition/admin-service/queries';
import type { GetPublicSettingsQuery } from '@/graphql/generated';

type Setting = GetPublicSettingsQuery['getPublicSettings'][number];

interface PublicSettingsContextType {
  settings: Setting[];
  settingsMap: Record<string, any>; // Key-value map for easy access
  getSetting: (key: string, defaultValue?: any) => any;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const PublicSettingsContext = createContext<PublicSettingsContextType | undefined>(undefined);

export const usePublicSettings = () => {
  const context = useContext(PublicSettingsContext);
  if (!context) {
    throw new Error('usePublicSettings must be used within a PublicSettingsProvider');
  }
  return context; 
};

interface PublicSettingsProviderProps {
  children: ReactNode;
}

export const PublicSettingsProvider = ({ children }: PublicSettingsProviderProps) => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [settingsMap, setSettingsMap] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const { data } = await apolloClient.query<GetPublicSettingsQuery>({
        query: GET_PUBLIC_SETTINGS,
        fetchPolicy: 'network-only',
      });

      if (data?.getPublicSettings) {
        setSettings(data.getPublicSettings);

        // Create key-value map for easy access
        const map: Record<string, any> = {};
        data.getPublicSettings.forEach((setting) => {
          map[setting.key] = setting.value;
        });
        setSettingsMap(map);

        console.log('Public settings loaded:', data.getPublicSettings.length);
      }
    } catch (error) {
      console.error('Error fetching public settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  // Helper function to get a single setting value
  const getSetting = (key: string, defaultValue: any = null): any => {
    return settingsMap[key] ?? defaultValue;
  };

  const value = {
    settings,
    settingsMap,
    getSetting,
    isLoading,
    refetch: fetchSettings,
  };

  return (
    <PublicSettingsContext.Provider value={value}>
      {children}
    </PublicSettingsContext.Provider>
  );
};
