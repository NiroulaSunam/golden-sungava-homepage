import { BaseRepository, type PaginationOptions, type FilterOptions } from '../base.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type GalleryPhotoRow = Tables<'gallery_photos'>;
export type GalleryPhotoInsert = TablesInsert<'gallery_photos'>;

class GalleryPhotosRepository extends BaseRepository<GalleryPhotoInsert, GalleryPhotoRow> {
  tableName = 'gallery_photos' as const;
  idColumn = 'id' as const;

  async findWhere(filters: FilterOptions, options?: PaginationOptions): Promise<GalleryPhotoRow[]> {
    let query = this.db.from(this.tableName).select('*');

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }

    if (options?.sortBy) {
      query = query.order(options.sortBy, {
        ascending: options.sortOrder !== 'desc',
      });
    }

    if (options?.limit) {
      const offset = options.page && options.page > 1
        ? (options.page - 1) * options.limit
        : 0;
      query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    }

    return (data || []) as GalleryPhotoRow[];
  }
}

export const galleryPhotosRepository = new GalleryPhotosRepository();
