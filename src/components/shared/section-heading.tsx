import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

export const SectionHeading = ({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = 'View All',
  className,
}: SectionHeadingProps) => {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <div className="mt-3 h-[3px] w-12 rounded-full bg-primary" />
          {subtitle && (
            <p className="mt-3 text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            {viewAllLabel} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};
