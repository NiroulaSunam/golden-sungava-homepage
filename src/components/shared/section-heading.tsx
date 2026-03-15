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
    <div className={cn('mb-8 flex items-end justify-between', className)}>
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-primary transition-colors hover:text-primary-dark"
        >
          {viewAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
};
