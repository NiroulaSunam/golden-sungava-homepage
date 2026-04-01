/**
 * Content Repository
 * Extends BaseRepository with bilingual JSONB extraction and published-content filtering.
 * Concrete repositories declare their bilingualColumns array so the base builds
 * the correct select string (e.g., 'name:name->>en, description:description->>en').
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository';
import { CONTENT_STATUS, POSTGREST_ERROR } from '@/lib/constants';

export type Lang = 'en' | 'np';

export abstract class ContentRepository<TInsert, TSelect> extends BaseRepository<TInsert, TSelect> {
  /**
   * Columns that store bilingual JSONB ({"en": "...", "np": "..."}).
   * Override in subclass. Empty array for non-bilingual tables (e.g., staff).
   */
  abstract bilingualColumns: string[];

  /**
   * Build a PostgREST select string that extracts the requested language
   * from all bilingual columns using the alias:field->>lang syntax.
   *
   * Example for lang='en', bilingualColumns=['name','description']:
   *   '*,name:name->>en,description:description->>en'
   *
   * The '*' fetches all non-JSONB columns; the aliased extractions
   * override the JSONB columns with flat strings.
   */
  buildPublishedSelectString = (lang: Lang): string => {
    if (this.bilingualColumns.length === 0) return '*';
    const extractions = this.bilingualColumns
      .map((col) => `${col}:${col}->>${lang}`)
      .join(',');
    return `*,${extractions}`;
  };

  /**
   * Find published, active, non-deleted content with language extraction.
   * Used by public API endpoints.
   */
  findPublished = async (
    lang: Lang,
    options?: PaginationOptions
  ): Promise<PaginatedResult<TSelect>> => {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const offset = (page - 1) * limit;

    const selectStr = this.buildPublishedSelectString(lang);

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
      throw new Error(`Failed to fetch published ${this.tableName}: ${error.message}`);
    }

    const total = count ?? 0;

    return {
      data: (data || []) as TSelect[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  };

  /**
   * Find draft content (for admin list views).
   * Returns raw JSONB (no language extraction) since admins see both languages.
   */
  findDrafts = async (options?: PaginationOptions): Promise<PaginatedResult<TSelect>> => {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const offset = (page - 1) * limit;

    let query = this.db
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .eq('status', CONTENT_STATUS.DRAFT)
      .is('deleted_at', null);

    if (options?.sortBy) {
      query = query.order(options.sortBy, {
        ascending: options.sortOrder !== 'desc',
      });
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch drafts from ${this.tableName}: ${error.message}`);
    }

    const total = count ?? 0;

    return {
      data: (data || []) as TSelect[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  };

  /**
   * Count draft rows (used by publish button badge).
   */
  countDrafts = async (): Promise<number> => {
    const { count, error } = await this.db
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .eq('status', CONTENT_STATUS.DRAFT)
      .is('deleted_at', null);

    if (error) {
      throw new Error(`Failed to count drafts in ${this.tableName}: ${error.message}`);
    }

    return count ?? 0;
  };

  /**
   * Return a single row with language extraction (for singleton tables).
   */
  findSingleton = async (lang: Lang): Promise<TSelect | null> => {
    const selectStr = this.buildPublishedSelectString(lang);

    const { data, error } = await this.db
      .from(this.tableName)
      .select(selectStr)
      .limit(1)
      .single();

    if (error) {
      if (error.code === POSTGREST_ERROR.NOT_FOUND) {
        return null;
      }
      throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    }

    return data as TSelect;
  };
}
