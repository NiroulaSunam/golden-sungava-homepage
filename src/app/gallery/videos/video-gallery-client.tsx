'use client';

import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { useLanguage } from '@/frontend/providers/language-provider';
import { fetchApi } from '@/lib/api/client';
import type { GalleryVideo } from '@/types/api';

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

export const VideoGalleryClient = () => {
  const { lang, t } = useLanguage();
  const [videos, setVideos] = useState<GalleryVideo[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchApi<GalleryVideo[]>('gallery-videos', { lang });
      if (data) setVideos(data);
    };
    load();
  }, [lang]);

  return (
    <>
      <PageHeader
        title={t('heading.videoGallery')}
        breadcrumbs={[
          { label: t('nav.gallery'), href: '/gallery' },
          { label: t('nav.videos'), href: '/gallery/videos' },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoEmbed key={video.id} videoId={video.videoId} title={video.title} />
          ))}
        </div>
      </div>
    </>
  );
};
