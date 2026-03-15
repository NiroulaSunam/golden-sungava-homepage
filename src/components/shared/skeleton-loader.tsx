import { cn } from '@/lib/utils';

type SkeletonVariant = 'rectangle' | 'circle' | 'text' | 'card' | 'image' | 'avatar';

interface SkeletonLoaderProps {
  variant?: SkeletonVariant;
  className?: string;
  lines?: number;
}

const variantStyles: Record<SkeletonVariant, string> = {
  rectangle: 'h-20 w-full rounded-md',
  circle: 'h-12 w-12 rounded-full',
  text: 'h-4 w-full rounded',
  card: 'h-48 w-full rounded-lg',
  image: 'h-40 w-full rounded-lg',
  avatar: 'h-10 w-10 rounded-full',
};

export const SkeletonLoader = ({
  variant = 'rectangle',
  className,
  lines = 1,
}: SkeletonLoaderProps) => {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'animate-pulse bg-muted rounded',
              i === lines - 1 ? 'h-4 w-3/4' : 'h-4 w-full',
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        variantStyles[variant],
        className,
      )}
    />
  );
};
