'use client';

import { useState, useCallback, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Eye } from 'lucide-react';
import { ContentListPage, type ColumnDef } from '@/components/admin/content-list-page';
import { ContentFormDialog, type FieldConfig } from '@/components/admin/content-form-dialog';
import { galleryEventsCreateSchema, galleryEventsUpdateSchema, galleryPhotosCreateSchema, galleryVideosCreateSchema } from '@/backend/services/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { toast } from 'sonner';
import { ImageLightbox } from '@/components/shared/image-lightbox';
import { ImageWithFallback } from '@/components/shared/image-with-fallback';
import { parseYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/components/shared/video-embed';

const COLUMNS: ColumnDef[] = [
  { key: 'name', label: 'Event Name' },
  { key: 'date', label: 'Date' },
];

const FIELDS: FieldConfig[] = [
  { name: 'name', label: 'Event Name', type: 'bilingual-input', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'cover_url', label: 'Cover Image URL', type: 'image-url' },
];

// ─── Photo Item with Thumbnail + Lightbox ────────────────

interface PhotoItemProps {
  photo: MediaItem;
  onDelete: (id: string) => void;
}

const PhotoItem = ({ photo, onDelete }: PhotoItemProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 rounded border p-2 text-sm">
      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded border">
        <ImageWithFallback src={photo.url} alt="Photo" fill className="object-cover" />
      </div>
      <span className="flex-1 truncate">{photo.url}</span>
      <Button variant="ghost" size="icon" onClick={() => setLightboxOpen(true)} title="Preview">
        <Eye className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onDelete(photo.id)}>
        <Trash2 className="h-3.5 w-3.5 text-destructive" />
      </Button>
      {lightboxOpen && (
        <ImageLightbox src={photo.url} alt="Gallery photo" onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
};

// ─── Video Item with YouTube Thumbnail + Preview ─────────

interface VideoItemProps {
  video: MediaItem;
  onDelete: (id: string) => void;
}

const VideoItem = ({ video, onDelete }: VideoItemProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const ytId = parseYouTubeId(video.url);
  const thumbnail = ytId ? getYouTubeThumbnail(ytId) : null;

  return (
    <>
      <div className="flex items-center gap-2 rounded border p-2 text-sm">
        <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt="Video thumbnail" className="h-12 w-16 shrink-0 rounded border object-cover" />
        ) : (
          <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded border bg-muted text-xs text-muted-foreground">
            Video
          </div>
        )}
        <span className="flex-1 truncate">{video.url}</span>
        <Button variant="ghost" size="icon" onClick={() => setPreviewOpen(true)} title="Preview">
          <Eye className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(video.id)}>
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>

      {/* Video preview dialog */}
      <Dialog open={previewOpen} onOpenChange={(open) => !open && setPreviewOpen(false)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Video Preview</DialogTitle>
          </DialogHeader>
          {ytId ? (
            <div className="aspect-video overflow-hidden rounded-lg">
              <iframe
                src={getYouTubeEmbedUrl(ytId)}
                title="Video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <p className="py-4 text-center text-muted-foreground">
              Preview not available for this video URL
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// ─── Media Manager Dialog ─────────────────────────────

interface MediaItem {
  id: string;
  url: string;
  sort_order: number;
  [key: string]: unknown;
}

interface MediaManagerProps {
  open: boolean;
  onClose: () => void;
  eventId: string;
}

const MediaManager = ({ open, onClose, eventId }: MediaManagerProps) => {
  const { adminFetch } = useAdminApi();
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const fetchMedia = useCallback(async () => {
    const [photosRes, videosRes] = await Promise.all([
      adminFetch<{ data: MediaItem[] }>(`/api/admin/gallery/photos?eventId=${eventId}`),
      adminFetch<{ data: MediaItem[] }>(`/api/admin/gallery/videos?eventId=${eventId}`),
    ]);
    if (photosRes.data) setPhotos(photosRes.data.data);
    if (videosRes.data) setVideos(videosRes.data.data);
  }, [adminFetch, eventId]);

  useEffect(() => {
    if (open) fetchMedia();
  }, [open, fetchMedia]);

  const addPhoto = async () => {
    if (!newPhotoUrl.trim()) return;
    const body = galleryPhotosCreateSchema.parse({
      gallery_event_id: eventId,
      url: newPhotoUrl,
      sort_order: photos.length,
    });
    const { error } = await adminFetch('/api/admin/gallery/photos', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (error) toast.error(error);
    else { setNewPhotoUrl(''); fetchMedia(); }
  };

  const deletePhoto = async (id: string) => {
    const { error } = await adminFetch(`/api/admin/gallery/photos?id=${id}`, { method: 'DELETE' });
    if (error) toast.error(error);
    else fetchMedia();
  };

  const addVideo = async () => {
    if (!newVideoUrl.trim()) return;
    const body = galleryVideosCreateSchema.parse({
      gallery_event_id: eventId,
      url: newVideoUrl,
      sort_order: videos.length,
    });
    const { error } = await adminFetch('/api/admin/gallery/videos', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (error) toast.error(error);
    else { setNewVideoUrl(''); fetchMedia(); }
  };

  const deleteVideo = async (id: string) => {
    const { error } = await adminFetch(`/api/admin/gallery/videos?id=${id}`, { method: 'DELETE' });
    if (error) toast.error(error);
    else fetchMedia();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage Media</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="photos">
          <TabsList className="w-full">
            <TabsTrigger value="photos" className="flex-1">Photos ({photos.length})</TabsTrigger>
            <TabsTrigger value="videos" className="flex-1">Videos ({videos.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-3 mt-3">
            <div className="flex gap-2">
              <Input
                placeholder="Photo URL (Google Drive)"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
              />
              <Button size="sm" onClick={addPhoto}><Plus className="h-4 w-4" /></Button>
            </div>
            {photos.map((photo) => (
              <PhotoItem key={photo.id} photo={photo} onDelete={deletePhoto} />
            ))}
          </TabsContent>

          <TabsContent value="videos" className="space-y-3 mt-3">
            <div className="flex gap-2">
              <Input
                placeholder="YouTube URL"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
              />
              <Button size="sm" onClick={addVideo}><Plus className="h-4 w-4" /></Button>
            </div>
            {videos.map((video) => (
              <VideoItem key={video.id} video={video} onDelete={deleteVideo} />
            ))}
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─── Gallery Page ─────────────────────────────────────

const GalleryPage = () => {
  const [mediaEventId, setMediaEventId] = useState<string | null>(null);

  return (
    <>
      <ContentListPage
        title="Gallery Events"
        apiPath="/api/admin/gallery-events"
        columns={[
          ...COLUMNS,
          {
            key: 'id',
            label: 'Media',
            render: (_value, row) => (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => { e.stopPropagation(); setMediaEventId(String(row.id)); }}
              >
                Manage Media
              </Button>
            ),
          },
        ]}
        renderForm={({ open, onClose, editItem, onSuccess }) => (
          <ContentFormDialog
            open={open}
            onClose={onClose}
            onSuccess={onSuccess}
            apiPath="/api/admin/gallery-events"
            schema={editItem ? galleryEventsUpdateSchema : galleryEventsCreateSchema}
            fields={FIELDS}
            editItem={editItem}
            title="Gallery Event"
          />
        )}
      />
      {mediaEventId && (
        <MediaManager
          open={!!mediaEventId}
          onClose={() => setMediaEventId(null)}
          eventId={mediaEventId}
        />
      )}
    </>
  );
};

export default GalleryPage;
