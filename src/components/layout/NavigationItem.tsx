import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavigationItem as NavItemType } from '@/config/navigation';

interface NavigationItemProps {
  item: NavItemType;
  onItemClick?: () => void;
}

export const NavigationItem = ({ item, onItemClick }: NavigationItemProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  // Check if current path matches this item or any of its children
  const isActive = location.pathname === item.href ||
    (hasChildren && item.children?.some(child => location.pathname === child.href));

  const handleParentClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      onItemClick?.();
    }
  };

  const handleChildClick = () => {
    onItemClick?.();
  };

  return (
    <div>
      {/* Parent Item */}
      {hasChildren ? (
        <button
          onClick={handleParentClick}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <div className="flex items-center">
            <item.icon className="mr-3 h-5 w-5" />
            {t(item.translationKey)}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      ) : (
        <Link
          to={item.href}
          onClick={handleParentClick}
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {t(item.translationKey)}
        </Link>
      )}

      {/* Children Items */}
      {hasChildren && isOpen && (
        <div className="mt-1 ml-4 space-y-1">
          {item.children?.map((child) => {
            const isChildActive = location.pathname === child.href;
            return (
              <Link
                key={child.href}
                to={child.href}
                onClick={handleChildClick}
                className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                  isChildActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {child.icon && <child.icon className="mr-3 h-4 w-4" />}
                {t(child.translationKey)}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
