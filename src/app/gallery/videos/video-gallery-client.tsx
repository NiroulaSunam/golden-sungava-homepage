'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { useLanguage } from '@/frontend/providers/language-provider';

// --- Sub-component ---

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

// Placeholder video data (no videos in mock data yet)
const PLACEHOLDER_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'School Tour - Golden Sungava' },
  { id: 'dQw4w9WgXcQ', title: 'Annual Day Celebration 2082' },
  { id: 'dQw4w9WgXcQ', title: 'Sports Meet Highlights' },
];

export const VideoGalleryClient = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumbs items={[
        { label: t('nav.gallery'), href: '/gallery/photos' },
        { label: t('nav.videos'), href: '/gallery/videos' },
      ]} />

      <h1 className="mt-8 font-heading text-3xl font-bold md:text-4xl">{t('heading.videoGallery')}</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_VIDEOS.map((video, index) => (
          <VideoEmbed key={index} videoId={video.id} title={video.title} />
        ))}
      </div>
    </div>
  );
};
