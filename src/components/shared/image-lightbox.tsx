'use client';

import { useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { useScrollLock } from '@/lib/hooks/use-scroll-lock';

interface ImageLightboxProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

export const ImageLightbox = ({ src, alt = 'Preview', onClose }: ImageLightboxProps) => {
  useScrollLock();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 text-white/80 hover:text-white"
        aria-label="Close"
      >
        <X className="h-8 w-8" />
      </button>
      <div
        className="relative max-h-[85vh] max-w-[90vw]"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          width={900}
          height={600}
          className="max-h-[85vh] w-auto rounded-lg object-contain"
        />
      </div>
    </div>
  );
};
