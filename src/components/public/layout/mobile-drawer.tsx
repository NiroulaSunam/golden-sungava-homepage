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
          'flex items-center rounded-xl px-4 py-3 text-[15px] font-medium transition-all',
          isActive ? 'bg-white/10 text-primary' : 'text-white/88 hover:bg-white/8 hover:text-primary',
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
          'flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all',
          isActive ? 'bg-white/10 text-primary' : 'text-white/88 hover:bg-white/8',
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180')} />
      </button>
      {isExpanded && (
        <div className="ml-3 border-l-2 border-white/12 pl-3">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="flex items-center rounded-lg px-3 py-2.5 text-sm text-white/68 transition-all hover:bg-white/8 hover:text-primary"
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
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/5"
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
  admissionHref: string;
}

export const MobileDrawer = ({ isOpen, onClose, navItems, admissionHref }: MobileDrawerProps) => {
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer panel */}
      <div className="absolute right-0 top-0 flex h-full w-[300px] max-w-[85vw] flex-col border-l border-white/10 bg-[#173B58] text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/8 p-1.5 text-white/70 transition-colors hover:bg-white/12 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Mobile navigation">
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <DrawerNavItem key={item.href} item={item} onClose={onClose} />
            ))}
          </div>
        </nav>

        {/* CTA + Install */}
        <div className="border-t border-white/10 p-4 space-y-3">
          <Link
            href={admissionHref}
            onClick={onClose}
            className="block w-full rounded-full bg-primary py-3.5 text-center text-sm font-bold text-[#173B58] shadow-[0_14px_30px_rgba(242,195,24,0.32)] transition-all hover:bg-primary-light"
          >
            {t('action.getAdmission')}
          </Link>
          <DrawerInstallButton onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
