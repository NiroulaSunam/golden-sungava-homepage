'use client';

import { useState, type SyntheticEvent } from 'react';
import Image, { type ImageProps } from 'next/image';
import { isRemoteImageUrl, normalizeImageUrl } from '@/lib/utils';

const DEFAULT_FALLBACK = '/images/placeholder.svg';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export const ImageWithFallback = ({
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  ...props
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (_e: SyntheticEvent<HTMLImageElement>) => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const requestedSrc = typeof props.src === 'string'
    ? normalizeImageUrl(props.src)
    : props.src;

  const normalizedFallback = normalizeImageUrl(fallbackSrc);

  const resolvedSrc = hasError
    ? normalizedFallback
    : requestedSrc && requestedSrc !== ''
    ? requestedSrc
    : normalizedFallback;

  if (!resolvedSrc) {
    return null;
  }

  const safeAlt = typeof alt === 'string' && alt.trim().length > 0 ? alt : '';
  const isRemote = typeof resolvedSrc === 'string' && isRemoteImageUrl(resolvedSrc);

  return (
    <Image
      {...props}
      alt={safeAlt}
      src={resolvedSrc}
      unoptimized={props.unoptimized ?? isRemote}
      onError={handleError}
    />
  );
};
