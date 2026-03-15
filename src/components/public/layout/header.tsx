'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { useLanguage } from '@/frontend/providers/language-provider';
import { fetchApi } from '@/lib/api/client';
import type { NavItem } from '@/types/api';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { LanguageSwitcher } from './language-switcher';
import { MobileDrawer } from './mobile-drawer';
import { cn } from '@/lib/utils';

// --- Sub-components ---

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

const NavLink = ({ item, isActive }: NavLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          'px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-foreground',
        )}
      >
        {item.label}
      </Link>
      {hasChildren && isOpen && (
        <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-md border border-border bg-card py-1 shadow-lg">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Header ---

export const Header = () => {
  const { config } = useSiteConfig();
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch navigation items
  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<NavItem[]>('navigation', { lang });
      if (data) setNavItems(data);
    };
    load();
  }, [lang]);

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-border bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-background',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
          {/* Logo + School Name */}
          <Link href="/" className="flex items-center gap-3">
            <ImageWithFallback
              src={config.logoUrl}
              alt={config.schoolName}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <span className="hidden font-heading text-lg font-semibold sm:inline">
              {config.schoolName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
              />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Link
              href="/admission"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              {t('action.getAdmission')}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="rounded-md p-2 text-foreground lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={navItems}
      />
    </>
  );
};
