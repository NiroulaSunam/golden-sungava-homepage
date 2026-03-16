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
  <div className={cn('relative overflow-hidden bg-gold-gradient py-12 md:py-16 lg:py-20', className)}>
    {/* Texture overlay */}
    <div className="texture-overlay pointer-events-none absolute inset-0 opacity-40" />
    {/* Radial glow */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,var(--cms-primary)_0%,transparent_60%)] opacity-[0.08]" />

    <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-5 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        {title}
      </h1>
      <div className="mt-4 flex items-center gap-1.5">
        <div className="h-[3px] w-10 rounded-full bg-primary-light" />
        <div className="h-[3px] w-3 rounded-full bg-primary-light/40" />
      </div>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">{subtitle}</p>
      )}
    </div>
  </div>
);
