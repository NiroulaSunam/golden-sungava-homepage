import { BaseRepository } from '../base.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type GalleryPhotoRow = Tables<'gallery_photos'>;
export type GalleryPhotoInsert = TablesInsert<'gallery_photos'>;

class GalleryPhotosRepository extends BaseRepository<GalleryPhotoInsert, GalleryPhotoRow> {
  tableName = 'gallery_photos' as const;
  idColumn = 'id' as const;
}

export const galleryPhotosRepository = new GalleryPhotosRepository();
