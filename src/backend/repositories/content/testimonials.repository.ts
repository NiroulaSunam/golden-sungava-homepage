import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type TestimonialRow = Tables<'testimonials'>;
export type TestimonialInsert = TablesInsert<'testimonials'>;

class TestimonialsRepository extends ContentRepository<TestimonialInsert, TestimonialRow> {
  tableName = 'testimonials' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['quote', 'author_name'];
}

export const testimonialsRepository = new TestimonialsRepository();
