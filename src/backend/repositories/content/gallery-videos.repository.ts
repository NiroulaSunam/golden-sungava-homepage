import { BaseRepository } from '../base.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type GalleryVideoRow = Tables<'gallery_videos'>;
export type GalleryVideoInsert = TablesInsert<'gallery_videos'>;

class GalleryVideosRepository extends BaseRepository<GalleryVideoInsert, GalleryVideoRow> {
  tableName = 'gallery_videos' as const;
  idColumn = 'id' as const;
}

export const galleryVideosRepository = new GalleryVideosRepository();
