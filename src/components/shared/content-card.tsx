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
  className?: string;
}

export const ContentCard = ({
  title,
  href,
  imageUrl,
  date,
  excerpt,
  author,
  className,
}: ContentCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        {date && (
          <time className="text-xs text-muted-foreground">{date}</time>
        )}
        <h3 className="mt-1 line-clamp-2 font-heading text-lg font-semibold group-hover:text-primary">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
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
