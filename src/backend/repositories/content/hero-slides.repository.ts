import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type HeroSlideRow = Tables<'hero_slides'>;
export type HeroSlideInsert = TablesInsert<'hero_slides'>;

class HeroSlidesRepository extends ContentRepository<HeroSlideInsert, HeroSlideRow> {
  tableName = 'hero_slides' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['heading', 'subheading', 'cta_text'];
}

export const heroSlidesRepository = new HeroSlidesRepository();
