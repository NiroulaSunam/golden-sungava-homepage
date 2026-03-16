import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JsonLd } from './json-ld';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: 'light' | 'dark';
}

export const Breadcrumbs = ({ items, className, variant = 'dark' }: BreadcrumbsProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const isDark = variant === 'dark';

  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        breadcrumbs={allItems.map((item) => ({
          name: item.label,
          url: `${appUrl}${item.href}`,
        }))}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn(
          'flex items-center gap-1.5 text-sm',
          isDark ? 'text-white/50' : 'text-muted-foreground',
          className,
        )}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <span key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className={cn('h-3 w-3', isDark ? 'text-white/30' : 'text-muted-foreground/50')} />
              )}
              {index === 0 && <Home className="h-3.5 w-3.5" />}
              {isLast ? (
                <span className={cn('font-medium', isDark ? 'text-white/80' : 'text-foreground')}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'transition-colors',
                    isDark ? 'hover:text-primary-light' : 'hover:text-primary',
                  )}
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
};
