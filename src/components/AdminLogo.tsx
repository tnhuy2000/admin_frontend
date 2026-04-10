import React from 'react';
import { Spin } from 'antd';
import { usePublicSettings } from '@/contexts/PublicSettingsContext';

interface AdminLogoProps {
  style?: React.CSSProperties;
  height?: number;
  fallbackText?: string;
}

export const AdminLogo: React.FC<AdminLogoProps> = ({
  style,
  height = 40,
  fallbackText = 'Admin Panel'
}) => {
  const { isLoading, getSetting } = usePublicSettings();
   const logoUrl = getSetting('ADMIN_LOGO')?.url;
 
   if (isLoading) {
     return <Spin size="small" />;
   }

  if (logoUrl && logoUrl.trim() !== '') {
    return (
      <img
        src={logoUrl}
        alt="Admin Logo"
        style={{
          height: `${height}px`,
          objectFit: 'contain',
          ...style,
        }}
      />
    );
  }

  // Fallback to text if no logo
  return (
    <div
      style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1890ff',
        ...style,
      }}
    >
      {fallbackText}
    </div>
  );
};
