import Link from 'next/link';
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
  className,
}: ContentCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'card-gold-accent group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg',
        featured && 'border-l-[3px] border-l-primary sm:col-span-2 sm:flex-row',
        className,
      )}
    >
      <div className={cn(
        'relative overflow-hidden',
        featured ? 'aspect-[16/10] sm:aspect-auto sm:w-1/2' : 'aspect-[16/10]',
      )}>
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={featured
            ? '(max-width: 768px) 100vw, 50vw'
            : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          }
        />
      </div>
      <div className={cn(
        'flex flex-1 flex-col p-4',
        featured && 'sm:justify-center sm:p-6',
      )}>
        {date && (
          <time className="text-xs text-muted-foreground">{date}</time>
        )}
        <h3 className={cn(
          'mt-1 line-clamp-2 font-heading font-semibold group-hover:text-primary',
          featured ? 'text-xl md:text-2xl' : 'text-lg',
        )}>
          {title}
        </h3>
        {excerpt && (
          <p className={cn(
            'mt-2 text-sm text-muted-foreground',
            featured ? 'line-clamp-3' : 'line-clamp-2',
          )}>
            {excerpt}
          </p>
        )}
        {author && (
          <p className="mt-auto pt-3 text-xs text-muted-foreground">
            By {author}
          </p>
        )}
      </div>
    </Link>
  );
};
