'use client';

import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

// --- URL Parsing ---

// cspell:ignore youtu
const YOUTUBE_PATTERNS = [
  /youtube\.com\/watch\?v=([^&]+)/,
  /youtube\.com\/embed\/([^?]+)/,
  /youtu\.be\/([^?]+)/,
  /youtube\.com\/shorts\/([^?]+)/,
];

const parseYouTubeId = (url: string): string | null => {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const getYouTubeThumbnail = (id: string): string =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const getYouTubeEmbedUrl = (id: string): string =>
  `https://www.youtube.com/embed/${id}?autoplay=1`;

const IS_DIRECT_VIDEO = /\.(mp4|webm|ogg|mov)(\?|$)/i;

// --- Auto-Thumbnail from Video File ---

const generateVideoThumbnail = (
  videoUrl: string,
  onThumbnail: (dataUrl: string) => void,
) => {
  if (typeof window === 'undefined') return;

  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';
  video.muted = true;
  video.preload = 'metadata';
  video.src = videoUrl;

  const cleanup = () => video.remove();

  video.addEventListener('loadedmetadata', () => {
    video.currentTime = 1;
  });

  video.addEventListener('seeked', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx && video.videoWidth && video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      try {
        ctx.drawImage(video, 0, 0);
        onThumbnail(canvas.toDataURL('image/jpeg', 0.8));
      } catch {
        // CORS or tainted canvas — skip
      }
    }
    cleanup();
  });

  video.addEventListener('error', cleanup);
};

// --- Props ---

export interface VideoEmbedProps {
  url: string;
  title: string;
  thumbnailUrl?: string;
}

// --- Component ---

export const VideoEmbed = ({ url, title, thumbnailUrl }: VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
  const hasAttemptedRef = useRef(false);

  const ytId = parseYouTubeId(url);
  const isYouTube = ytId !== null;
  const isDirectVideo = IS_DIRECT_VIDEO.test(url);

  // Resolve thumbnail: explicit prop > YouTube API > auto-generated from video
  const resolvedThumbnail = thumbnailUrl
    ?? (isYouTube && ytId ? getYouTubeThumbnail(ytId) : null)
    ?? generatedThumbnail;

  // Auto-generate thumbnail for direct video files when none provided.
  // Uses a ref to avoid re-triggering and a callback-based API to avoid
  // the synchronous setState-in-effect lint warning.
  useEffect(() => {
    if (hasAttemptedRef.current || thumbnailUrl || isYouTube || !isDirectVideo) return;
    hasAttemptedRef.current = true;
    generateVideoThumbnail(url, setGeneratedThumbnail);
  }, [url, thumbnailUrl, isYouTube, isDirectVideo]);

  // --- Poster state (not yet playing) ---
  if (!isPlaying) {
    return (
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        className="group relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
        aria-label={`Play ${title}`}
      >
        {resolvedThumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resolvedThumbnail} alt={title} className="h-full w-full object-cover" />
        )}
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

  // --- Playing state ---

  // YouTube → iframe
  if (isYouTube && ytId) {
    return (
      <div className="aspect-video overflow-hidden rounded-lg">
        <iframe
          src={getYouTubeEmbedUrl(ytId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  // Direct video file → native video element
  if (isDirectVideo) {
    return (
      <div className="aspect-video overflow-hidden rounded-lg bg-black">
        <video
          src={url}
          autoPlay
          controls
          className="h-full w-full"
          poster={resolvedThumbnail ?? undefined}
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  // Fallback → iframe embed
  return (
    <div className="aspect-video overflow-hidden rounded-lg">
      <iframe
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
};
