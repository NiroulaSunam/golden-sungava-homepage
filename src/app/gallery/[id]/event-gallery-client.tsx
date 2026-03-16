'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { GalleryEvent, GalleryPhoto } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';
import { Lightbox } from '@/components/shared/lightbox';
import { VideoEmbed } from '@/components/shared/video-embed';

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

// --- Skeleton Items (stable keys) ---

const SKELETON_KEYS = ['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6'];

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
            {SKELETON_KEYS.map((key) => (
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
                <VideoEmbed key={video.url} url={video.url} title={video.title} thumbnailUrl={video.thumbnailUrl} />
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
