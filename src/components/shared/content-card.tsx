import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from './image-with-fallback';

interface ContentCardProps {
  title: string;
  href: string;
  imageUrl: string;
  date?: string;
  excerpt?: string;
  author?: string;
  featured?: boolean;
  compact?: boolean;
  className?: string;
}

export const ContentCard = ({
  title,
  href,
  imageUrl,
  date,
  excerpt,
  author,
  featured = false,
  compact = false,
  className,
}: ContentCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'card-elevated group flex flex-col overflow-hidden',
        featured && 'sm:col-span-2 sm:flex-row',
        className,
      )}
    >
      <div className={cn(
        'relative overflow-hidden',
        featured
          ? 'aspect-[16/10] sm:aspect-auto sm:w-1/2'
          : compact
            ? 'aspect-[16/8.5]'
            : 'aspect-[16/10]',
      )}>
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured
            ? '(max-width: 768px) 100vw, 50vw'
            : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          }
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className={cn(
        'flex flex-1 flex-col',
        compact ? 'p-4' : 'p-5',
        featured && 'sm:justify-center sm:p-8',
      )}>
        <div className="flex flex-wrap items-center gap-3">
          {date && (
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
          )}
          {author && (
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <User className="h-3 w-3" />
              {author}
            </span>
          )}
        </div>
        <h3 className={cn(
          'mt-2 line-clamp-2 font-heading font-bold text-card-foreground transition-colors group-hover:text-primary',
          featured ? 'text-xl md:text-2xl' : compact ? 'text-base' : 'text-lg',
        )}>
          {title}
        </h3>
        {excerpt && (
          <p className={cn(
            'leading-relaxed text-muted-foreground',
            compact ? 'mt-2 text-[13px] line-clamp-2' : 'mt-2.5 text-sm',
            featured ? 'line-clamp-3' : 'line-clamp-2',
          )}>
            {excerpt}
          </p>
        )}
        <span className={cn(
          'mt-auto inline-flex items-center gap-1 font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100',
          compact ? 'pt-3 text-xs' : 'pt-4 text-sm',
        )}>
          Read more &rarr;
        </span>
      </div>
    </Link>
  );
};
