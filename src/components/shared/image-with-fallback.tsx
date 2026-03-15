'use client';

import { useState, type SyntheticEvent } from 'react';
import Image, { type ImageProps } from 'next/image';

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

  return (
    <Image
      {...props}
      alt={alt}
      src={hasError ? fallbackSrc : props.src}
      onError={handleError}
    />
  );
};
