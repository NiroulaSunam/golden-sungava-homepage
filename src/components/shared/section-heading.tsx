import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeading = ({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = 'View All',
  className,
  centered = false,
}: SectionHeadingProps) => {
  return (
    <div className={cn('mb-8 md:mb-9', className)}>
      <div className={cn(
        'flex items-end justify-between',
        centered && 'flex-col items-center text-center',
      )}>
        <div className={centered ? 'flex flex-col items-center' : undefined}>
          <h2 className="font-heading text-[1.85rem] font-bold tracking-tight text-foreground md:text-[2.3rem] lg:text-[2.6rem]">
            {title}
          </h2>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="h-[4px] w-10 rounded-full bg-primary" />
            <div className="h-[4px] w-4 rounded-full bg-primary/50" />
            <div className="h-[4px] w-2 rounded-full bg-primary/25" />
          </div>
          {subtitle && (
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-[15px]">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group mt-4 flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark md:mt-0"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
