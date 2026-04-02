import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type SiteConfigRow = Tables<'site_config'>;
export type SiteConfigInsert = TablesInsert<'site_config'>;

class SiteConfigRepository extends ContentRepository<SiteConfigInsert, SiteConfigRow> {
  tableName = 'site_config' as const;
  idColumn = 'id' as const;
  bilingualColumns = [
    'school_name',
    'tagline',
    'address',
    'office_hours',
    'stats',
    'hero_accent_text',
    'section_subtitles',
    'page_descriptions',
    'footer',
    'seo',
  ];
}

export const siteConfigRepository = new SiteConfigRepository();
