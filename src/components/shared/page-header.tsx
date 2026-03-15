import { cn } from '@/lib/utils';
import { Breadcrumbs } from './breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}

export const PageHeader = ({ title, subtitle, breadcrumbs, className }: PageHeaderProps) => (
  <div className={cn('relative overflow-hidden bg-muted py-10 md:py-14', className)}>
    {/* Subtle texture overlay */}
    <div className="texture-overlay pointer-events-none absolute inset-0 opacity-30" />

    <div className="relative mx-auto max-w-7xl px-4 md:px-6">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">{title}</h1>
      <div className="mt-3 h-[3px] w-12 rounded-full bg-primary" />
      {subtitle && (
        <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  </div>
);
