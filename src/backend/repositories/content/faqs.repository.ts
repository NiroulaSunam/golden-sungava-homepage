import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type FaqRow = Tables<'faqs'>;
export type FaqInsert = TablesInsert<'faqs'>;

class FaqsRepository extends ContentRepository<FaqInsert, FaqRow> {
  tableName = 'faqs' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['question', 'answer'];
}

export const faqsRepository = new FaqsRepository();
