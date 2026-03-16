'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Download } from 'lucide-react';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useInstall } from '@/frontend/providers/install-provider';
import { fetchApi } from '@/lib/api/client';
import type { NavItem } from '@/types/api';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { LanguageSwitcher } from './language-switcher';
import { MobileDrawer } from './mobile-drawer';
import { cn, getAcronym, getShortName } from '@/lib/utils';

// --- Dropdown Sub-component ---

interface DropdownMenuProps {
  item: NavItem;
  isActive: boolean;
}

const DropdownMenu = ({ item, isActive }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className={cn(
          'flex items-center gap-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors',
          isActive
            ? 'text-primary'
            : 'text-foreground/80 hover:text-primary',
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-lg border border-border/60 bg-card py-2 shadow-xl shadow-black/5">
          <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 border-l border-t border-border/60 bg-card" />
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Single Link Sub-component ---

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

const SingleNavLink = ({ item, isActive }: NavLinkProps) => (
  <Link
    href={item.href}
    className={cn(
      'px-3 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors',
      isActive
        ? 'text-primary'
        : 'text-foreground/80 hover:text-primary',
    )}
  >
    {item.label}
  </Link>
);

// --- Install Button Sub-component ---

const InstallButton = () => {
  const { canInstall, triggerInstall } = useInstall();

  if (!canInstall) return null;

  return (
    <button
      type="button"
      onClick={triggerInstall}
      className="flex items-center gap-1.5 rounded-md border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/10"
      aria-label="Install app"
    >
      <Download className="h-3.5 w-3.5" />
      <span className="hidden xl:inline">Install</span>
    </button>
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

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<NavItem[]>('navigation', { lang });
      if (data) setNavItems(data);
    };
    load();
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLinkActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-border/40 bg-background/98 backdrop-blur-xl shadow-sm'
            : 'bg-background',
        )}
      >
        {/* Top accent line */}
        <div className="h-[3px] bg-gradient-to-r from-primary-dark via-primary to-primary-light" />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-[72px] lg:px-6">
          {/* Logo + School Name */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <ImageWithFallback
              src={config.logoUrl}
              alt={config.schoolName}
              width={44}
              height={44}
              className="h-10 w-10 object-contain lg:h-11 lg:w-11"
            />
            <div className="flex flex-col leading-tight">
              {/* Full short name on xl+, acronym on lg-xl */}
              <span className="hidden font-heading text-base font-bold tracking-tight text-foreground xl:inline">
                {getShortName(config.schoolName)}
              </span>
              <span className="hidden font-heading text-base font-bold tracking-tight text-foreground lg:inline xl:hidden">
                {getAcronym(config.schoolName)}
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-widest text-primary xl:inline">
                {config.schoolName.split(/\s+/).slice(2).join(' ')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — 6 items */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {navItems.map((item) =>
              item.children && item.children.length > 0 ? (
                <DropdownMenu
                  key={item.href}
                  item={item}
                  isActive={isLinkActive(item.href)}
                />
              ) : (
                <SingleNavLink
                  key={item.href}
                  item={item}
                  isActive={isLinkActive(item.href)}
                />
              ),
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <InstallButton />
            <LanguageSwitcher />
            <Link
              href="/admission"
              className="rounded-md bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-primary-dark hover:shadow-md"
            >
              {t('action.getAdmission')}
            </Link>
          </div>

          {/* Mobile: Logo text + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <span className="font-heading text-sm font-bold text-foreground">{getAcronym(config.schoolName)}</span>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="rounded-md p-2 text-foreground hover:bg-muted"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={navItems}
      />
    </>
  );
};
