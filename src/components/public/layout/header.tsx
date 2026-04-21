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
import { getAdmissionHref } from '@/lib/admission';
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
          'flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide uppercase transition-all',
          isActive
            ? 'bg-white/10 text-primary'
            : 'text-white/80 hover:bg-white/8 hover:text-primary',
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-xl border border-border/50 bg-card p-2 shadow-xl shadow-black/8">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded-lg px-3.5 py-2.5 text-sm text-foreground/80 transition-all hover:bg-[#173B58]/6 hover:text-[#173B58]"
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
      'rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide uppercase transition-all',
      isActive
        ? 'bg-white/10 text-primary'
        : 'text-white/80 hover:bg-white/8 hover:text-primary',
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
      className="flex items-center gap-1.5 rounded-full border border-white/14 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:border-primary/40 hover:bg-white/8"
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
  const admissionHref = getAdmissionHref(config);

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
            ? 'bg-background/70 backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto px-2 pt-2 sm:px-4 lg:max-w-7xl lg:px-6">
          <div
            className={cn(
              'flex h-16 items-center justify-between rounded-[1.9rem] border px-4 shadow-[0_16px_38px_rgba(10,32,49,0.14)] lg:h-[92px] lg:px-6',
              isScrolled
                ? 'border-white/12 bg-[#143550]/95'
                : 'border-[#214f72] bg-[#173B58]',
            )}
          >
          {/* Logo + School Name */}
          <Link href="/" className="group flex items-center gap-3 shrink-0">
            <div className="relative rounded-full border-2 border-primary bg-[#10283B] p-1 shadow-[0_0_0_4px_rgba(255,255,255,0.06)]">
              <ImageWithFallback
                src={config.logoUrl}
                alt={config.schoolName}
                width={44}
                height={44}
                className="h-10 w-10 rounded-full object-contain lg:h-14 lg:w-14"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="hidden font-heading text-[15px] font-bold uppercase tracking-[0.02em] text-primary xl:inline xl:text-[20px]">
                {getShortName(config.schoolName)}
              </span>
              <span className="hidden font-heading text-base font-bold tracking-tight text-primary lg:inline xl:hidden">
                {getAcronym(config.schoolName)}
              </span>
              <span className="hidden text-[11px] font-semibold tracking-wide text-white/92 xl:inline">
                {config.address}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
              href={admissionHref}
              className="rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#173B58] shadow-[0_10px_24px_rgba(242,195,24,0.35)] transition-all hover:-translate-y-0.5 hover:bg-primary-light"
            >
              {t('action.getAdmission')}
            </Link>
          </div>

          {/* Mobile: Logo text + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <span className="font-heading text-sm font-bold text-primary">{getAcronym(config.schoolName)}</span>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="rounded-full bg-white/8 p-2 text-white transition-colors hover:bg-white/14"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={navItems}
        admissionHref={admissionHref}
      />
    </>
  );
};
