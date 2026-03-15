'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { fetchApi } from '@/lib/api/client';
import { useLanguage } from '@/frontend/providers/language-provider';
import type { PhotoAlbum } from '@/types/api';
import { PageHeader } from '@/components/shared/page-header';
import { SectionHeading } from '@/components/shared/section-heading';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { SkeletonLoader } from '@/components/shared/skeleton-loader';

// --- Album Card Sub-component ---

interface AlbumCardProps {
  album: PhotoAlbum;
}

const AlbumCard = ({ album }: AlbumCardProps) => (
  <Link
    href="/gallery/photos"
    className="card-gold-accent group overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:shadow-lg"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <ImageWithFallback
        src={album.coverUrl}
        alt={album.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
    </div>
    <div className="p-3">
      <h3 className="line-clamp-1 font-heading text-sm font-semibold">{album.name}</h3>
      <p className="text-xs text-muted-foreground">{album.date}</p>
    </div>
  </Link>
);

// --- Video Thumbnail Sub-component ---

interface VideoThumbnailProps {
  videoId: string;
  title: string;
}

const VideoThumbnail = ({ videoId, title }: VideoThumbnailProps) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <Link
      href="/gallery/videos"
      className="group relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
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
    </Link>
  );
};

// --- Placeholder video data ---

const PLACEHOLDER_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'School Tour - Golden Sungava' },
  { id: 'dQw4w9WgXcQ', title: 'Annual Day Celebration 2082' },
  { id: 'dQw4w9WgXcQ', title: 'Sports Meet Highlights' },
];

// --- Main Component ---

export const GalleryClient = () => {
  const { lang, t } = useLanguage();
  const [albums, setAlbums] = useState<PhotoAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<PhotoAlbum[]>('gallery-photos', { lang });
      if (data) setAlbums(data);
      setIsLoading(false);
    };
    load();
  }, [lang]);

  return (
    <>
      <PageHeader
        title={t('heading.gallery')}
        subtitle="Explore moments from school life — events, celebrations, and everyday learning."
        breadcrumbs={[{ label: t('nav.gallery'), href: '/gallery' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* Photo Albums Section */}
        <SectionHeading
          title={t('nav.photos')}
          viewAllHref="/gallery/photos"
          viewAllLabel={t('action.viewAll')}
        />

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonLoader key={i} variant="card" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {albums.slice(0, 8).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}

        {/* Section Divider */}
        <div className="my-12">
          <div className="section-divider" />
        </div>

        {/* Videos Section */}
        <SectionHeading
          title={t('nav.videos')}
          viewAllHref="/gallery/videos"
          viewAllLabel={t('action.viewAll')}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_VIDEOS.map((video, index) => (
            <VideoThumbnail key={index} videoId={video.id} title={video.title} />
          ))}
        </div>
      </div>
    </>
  );
};
