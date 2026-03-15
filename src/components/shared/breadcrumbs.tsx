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
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const allItems = [{ label: 'Home', href: '/' }, ...items];

  return (
    <>
      <JsonLd
        type="BreadcrumbList"
        breadcrumbs={allItems.map((item) => ({
          name: item.label,
          url: `${appUrl}${item.href}`,
        }))}
      />
      <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-sm text-muted-foreground', className)}>
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <span key={item.href} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {index === 0 && <Home className="h-3.5 w-3.5" />}
              {isLast ? (
                <span className="font-medium text-foreground">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-primary">
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
