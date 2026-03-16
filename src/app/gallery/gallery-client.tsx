'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Camera, Film, Expand, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import { useSiteConfig } from '@/frontend/providers/site-config-provider';
import type { GalleryEvent, GalleryPhoto } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

// --- Count Badge ---

interface CountBadgeProps {
  icon: React.ReactNode;
  count: number;
}

const CountBadge = ({ icon, count }: CountBadgeProps) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
    {icon}
    {count}
  </span>
);

// --- Lightbox ---

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

// --- Video Embed (lazy-loaded YouTube) ---

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
          <div className="rounded-full bg-primary p-3">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
        <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2 text-xs text-white">
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

// --- Quick Preview Modal ---

interface QuickPreviewProps {
  event: GalleryEvent;
  onClose: () => void;
  onOpenLightbox: (index: number) => void;
}

const QuickPreview = ({ event, onClose, onOpenLightbox }: QuickPreviewProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Quick preview" onClick={onClose} onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-card p-5 shadow-2xl"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold">{event.name}</h2>
            <p className="text-sm text-muted-foreground">{event.date}</p>
          </div>
          <button type="button" onClick={onClose} className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Photo Grid */}
        {event.photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {event.photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => onOpenLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
              >
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.caption || 'Photo'}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </button>
            ))}
          </div>
        )}

        {/* Videos */}
        {event.videos.length > 0 && (
          <div className={event.photos.length > 0 ? 'mt-4' : ''}>
            <div className="grid gap-3 sm:grid-cols-2">
              {event.videos.map((video) => (
                <VideoEmbed key={video.videoId} videoId={video.videoId} title={video.title} />
              ))}
            </div>
          </div>
        )}

        {/* View Full Page Link */}
        <div className="mt-4 text-center">
          <Link
            href={`/gallery/${event.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View full event page
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Event Card ---

interface EventCardProps {
  event: GalleryEvent;
  onQuickPreview: () => void;
}

const EventCard = ({ event, onQuickPreview }: EventCardProps) => (
  <div className="card-gold-accent group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
    <Link href={`/gallery/${event.id}`} className="block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={event.coverUrl}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute bottom-2 right-2 flex gap-1.5">
          {event.photos.length > 0 && (
            <CountBadge icon={<Camera className="h-3 w-3" />} count={event.photos.length} />
          )}
          {event.videos.length > 0 && (
            <CountBadge icon={<Film className="h-3 w-3" />} count={event.videos.length} />
          )}
        </div>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 font-heading text-sm font-semibold">{event.name}</h3>
        <p className="text-xs text-muted-foreground">{event.date}</p>
      </div>
    </Link>

    {/* Quick Preview Button */}
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickPreview(); }}
      className="absolute left-2 top-2 rounded-full bg-black/50 p-1.5 text-white/80 backdrop-blur-sm transition-opacity hover:bg-black/70 hover:text-white md:opacity-0 md:group-hover:opacity-100"
      aria-label="Quick preview"
    >
      <Expand className="h-4 w-4" />
    </button>
  </div>
);

// --- Skeleton Items (stable keys) ---

const SKELETON_KEYS = ['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6', 'sk-7', 'sk-8'];

// --- Main Component ---

export const GalleryClient = () => {
  const { lang, t } = useLanguage();
  const { config } = useSiteConfig();
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewEvent, setPreviewEvent] = useState<GalleryEvent | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<GalleryEvent[]>('gallery-events', { lang });
      if (data) setEvents(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <>
      <PageHeader
        title={t('heading.gallery')}
        subtitle={config.pageDescriptions.gallery}
        breadcrumbs={[{ label: t('nav.gallery'), href: '/gallery' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {SKELETON_KEYS.map((key) => (
              <SkeletonLoader key={key} variant="card" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onQuickPreview={() => setPreviewEvent(event)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Preview Modal */}
      {previewEvent && (
        <QuickPreview
          event={previewEvent}
          onClose={() => setPreviewEvent(null)}
          onOpenLightbox={handleOpenLightbox}
        />
      )}

      {/* Lightbox (on top of quick preview) */}
      {previewEvent && lightboxIndex !== null && previewEvent.photos[lightboxIndex] && (
        <Lightbox
          photo={previewEvent.photos[lightboxIndex]}
          onClose={handleCloseLightbox}
          onPrev={() => setLightboxIndex((prev) => Math.max(0, (prev ?? 0) - 1))}
          onNext={() => setLightboxIndex((prev) => Math.min(previewEvent.photos.length - 1, (prev ?? 0) + 1))}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < previewEvent.photos.length - 1}
        />
      )}
    </>
  );
};
