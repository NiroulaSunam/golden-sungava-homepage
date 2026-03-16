'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, Download } from 'lucide-react';
import type { NavItem } from '@/types/api';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useInstall } from '@/frontend/providers/install-provider';
import { LanguageSwitcher } from './language-switcher';
import { cn } from '@/lib/utils';

// --- Sub-components ---

interface DrawerNavItemProps {
  item: NavItem;
  onClose: () => void;
}

const DrawerNavItem = ({ item, onClose }: DrawerNavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          'block px-4 py-3 text-base font-medium transition-colors',
          isActive ? 'text-primary' : 'text-foreground hover:text-primary',
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex w-full items-center justify-between px-4 py-3 text-base font-medium',
          isActive ? 'text-primary' : 'text-foreground',
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
      </button>
      {isExpanded && (
        <div className="border-l-2 border-primary/20 ml-4">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Install Button for Drawer ---

const DrawerInstallButton = ({ onClose }: { onClose: () => void }) => {
  const { canInstall, triggerInstall } = useInstall();

  if (!canInstall) return null;

  const handleInstall = async () => {
    await triggerInstall();
    onClose();
  };

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="flex w-full items-center gap-2 rounded-md border border-primary/30 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/10 justify-center"
    >
      <Download className="h-4 w-4" />
      Install App
    </button>
  );
};

// --- Main Drawer ---

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export const MobileDrawer = ({ isOpen, onClose, navItems }: MobileDrawerProps) => {
  const { t } = useLanguage();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer panel */}
      <div className="absolute right-0 top-0 h-full w-[300px] max-w-[85vw] bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="overflow-y-auto py-2" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <DrawerNavItem key={item.href} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* CTA + Install */}
        <div className="border-t border-border p-4 space-y-3">
          <Link
            href="/admission"
            onClick={onClose}
            className="block w-full rounded-md bg-primary py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            {t('action.getAdmission')}
          </Link>
          <DrawerInstallButton onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
