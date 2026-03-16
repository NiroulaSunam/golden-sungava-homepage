'use client';

import { useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { useScrollLock } from '@/lib/hooks/use-scroll-lock';
import type { GalleryPhoto } from '@/types/api';

// --- Props ---

export interface LightboxProps {
  photo: GalleryPhoto;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

// --- Component ---

export const Lightbox = ({ photo, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) => {
  useScrollLock();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" role="dialog" aria-modal="true" aria-label="Photo lightbox" onClick={onClose} onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 text-white/80 hover:text-white" aria-label="Close">
        <X className="h-8 w-8" />
      </button>
      {hasPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/80 hover:text-white"
          aria-label="Previous"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white/80 hover:text-white"
          aria-label="Next"
        >
          <ChevronRight className="h-10 w-10" />
        </button>
      )}
      <div className="relative max-h-[85vh] max-w-[90vw]" role="presentation" onClick={(e) => e.stopPropagation()}>
        <ImageWithFallback
          src={photo.url}
          alt={photo.caption || 'Gallery photo'}
          width={900}
          height={600}
          className="max-h-[85vh] w-auto rounded-lg object-contain"
        />
        {photo.caption && (
          <p className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/80 p-3 text-center text-sm text-white">
            {photo.caption}
          </p>
        )}
      </div>
    </div>
  );
};
