import { ContentRepository, type Lang } from '../content.repository';
import type { PaginationOptions, PaginatedResult } from '../base.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';
import { CONTENT_STATUS } from '@/lib/constants';

export type GalleryEventRow = Tables<'gallery_events'>;
export type GalleryEventInsert = TablesInsert<'gallery_events'>;

class GalleryEventsRepository extends ContentRepository<GalleryEventInsert, GalleryEventRow> {
  tableName = 'gallery_events' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['name'];

  /**
   * Find gallery events with nested photos and videos using Supabase joins.
   */
  findWithMedia = async (
    lang: Lang,
    options?: PaginationOptions
  ): Promise<PaginatedResult<GalleryEventRow & { gallery_photos: unknown[]; gallery_videos: unknown[] }>> => {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const offset = (page - 1) * limit;

    const langExtractions = this.bilingualColumns
      .map((col) => `${col}:${col}->>${lang}`)
      .join(',');

    const selectStr = `*,${langExtractions},gallery_photos(*, caption:caption->>${lang}),gallery_videos(*, title:title->>${lang})`;

    let query = this.db
      .from(this.tableName)
      .select(selectStr, { count: 'exact' })
      .eq('status', CONTENT_STATUS.PUBLISHED)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (options?.sortBy) {
      query = query.order(options.sortBy, {
        ascending: options.sortOrder !== 'desc',
      });
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch gallery events with media: ${error.message}`);
    }

    const total = count ?? 0;

    return {
      data: (data || []) as (GalleryEventRow & { gallery_photos: unknown[]; gallery_videos: unknown[] })[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  };
}

export const galleryEventsRepository = new GalleryEventsRepository();
