'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { PhotoAlbum } from '@/types/api';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

// --- Lightbox Sub-component ---

interface LightboxProps {
  imageUrl: string;
  albumName: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Lightbox = ({ imageUrl, albumName, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
    <button type="button" onClick={onClose} className="absolute right-4 top-4 text-white/80 hover:text-white" aria-label="Close">
      <X className="h-8 w-8" />
    </button>
    {hasPrev && (
      <button type="button" onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white" aria-label="Previous">
        <ChevronLeft className="h-10 w-10" />
      </button>
    )}
    {hasNext && (
      <button type="button" onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white" aria-label="Next">
        <ChevronRight className="h-10 w-10" />
      </button>
    )}
    <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
      <ImageWithFallback
        src={imageUrl}
        alt={albumName}
        width={900}
        height={600}
        className="max-h-[85vh] w-auto rounded-lg object-contain"
      />
    </div>
  </div>
);

// --- Album Card Sub-component ---

interface AlbumCardProps {
  album: PhotoAlbum;
  onClick: () => void;
}

const AlbumCard = ({ album, onClick }: AlbumCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:shadow-lg"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <ImageWithFallback
        src={album.coverUrl}
        alt={album.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-3">
      <h3 className="line-clamp-1 font-heading text-sm font-semibold">{album.name}</h3>
      <p className="text-xs text-muted-foreground">{album.date}</p>
    </div>
  </button>
);

// --- Main Component ---

export const PhotoGalleryClient = () => {
  const { lang, t } = useLanguage();
  const [albums, setAlbums] = useState<PhotoAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<PhotoAlbum[]>('gallery-photos', { lang });
      if (data) setAlbums(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[
        { label: t('nav.gallery'), href: '/gallery/photos' },
        { label: t('nav.photos'), href: '/gallery/photos' },
      ]} />

      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.gallery')}</h1>

      {isLoading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonLoader key={i} variant="card" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {albums.map((album, index) => (
            <AlbumCard key={album.id} album={album} onClick={() => setLightboxIndex(index)} />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && albums[lightboxIndex] && (
        <Lightbox
          imageUrl={albums[lightboxIndex].coverUrl}
          albumName={albums[lightboxIndex].name}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => Math.max(0, (prev ?? 0) - 1))}
          onNext={() => setLightboxIndex((prev) => Math.min(albums.length - 1, (prev ?? 0) + 1))}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < albums.length - 1}
        />
      )}
    </div>
  );
};
