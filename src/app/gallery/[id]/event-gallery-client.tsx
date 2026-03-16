'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { GalleryEvent, GalleryPhoto } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

// --- Lightbox Sub-component ---

interface LightboxProps {
  photo: GalleryPhoto;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Lightbox = ({ photo, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) => {
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
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

// --- Photo Grid Item ---

interface PhotoGridItemProps {
  photo: GalleryPhoto;
  onClick: () => void;
}

const PhotoGridItem = ({ photo, onClick }: PhotoGridItemProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
  >
    <ImageWithFallback
      src={photo.url}
      alt={photo.caption || 'Gallery photo'}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
    />
    {photo.caption && (
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
        <p className="p-2 text-xs text-white">{photo.caption}</p>
      </div>
    )}
  </button>
);

// --- Video Embed Sub-component ---

interface VideoEmbedProps {
  videoId: string;
  title: string;
}

const VideoEmbed = ({ videoId, title }: VideoEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (!isLoaded) {
    return (
      <button
        type="button"
        onClick={() => setIsLoaded(true)}
        className="group relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
        aria-label={`Play ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumbnailUrl} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/50">
          <div className="rounded-full bg-primary p-4">
            <Play className="h-8 w-8 text-white" fill="white" />
          </div>
        </div>
        <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-3 text-sm text-white">
          {title}
        </p>
      </button>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
};

// --- Main Component ---

export const EventGalleryClient = () => {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const [event, setEvent] = useState<GalleryEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<GalleryEvent[]>('gallery-events', { lang });
      if (data) {
        const found = data.find((e) => String(e.id) === id);
        setEvent(found ?? null);
      }
      setIsLoading(false);
    };
    load();
  }, [lang, id]);

  if (isLoading) {
    return (
      <>
        <PageHeader
          title={t('heading.gallery')}
          breadcrumbs={[
            { label: t('nav.gallery'), href: '/gallery' },
            { label: '...', href: '#' },
          ]}
        />
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6'].map((key) => (
              <SkeletonLoader key={key} variant="card" />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <PageHeader
          title={t('heading.gallery')}
          breadcrumbs={[{ label: t('nav.gallery'), href: '/gallery' }]}
        />
        <div className="mx-auto max-w-7xl px-4 py-12 text-center md:px-6 md:py-16">
          <p className="text-muted-foreground">Event not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={event.name}
        subtitle={event.date}
        breadcrumbs={[
          { label: t('nav.gallery'), href: '/gallery' },
          { label: event.name, href: `/gallery/${event.id}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* Photos Section */}
        {event.photos.length > 0 && (
          <section>
            <SectionHeading title={t('nav.photos')} />
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {event.photos.map((photo, index) => (
                <PhotoGridItem
                  key={photo.id}
                  photo={photo}
                  onClick={() => setLightboxIndex(index)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Videos Section */}
        {event.videos.length > 0 && (
          <section className={event.photos.length > 0 ? 'mt-12' : ''}>
            <SectionHeading title={t('nav.videos')} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {event.videos.map((video) => (
                <VideoEmbed key={video.videoId} videoId={video.videoId} title={video.title} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && event.photos[lightboxIndex] && (
        <Lightbox
          photo={event.photos[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => Math.max(0, (prev ?? 0) - 1))}
          onNext={() => setLightboxIndex((prev) => Math.min(event.photos.length - 1, (prev ?? 0) + 1))}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < event.photos.length - 1}
        />
      )}
    </>
  );
};
