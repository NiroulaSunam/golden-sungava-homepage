import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type NoticeRow = Tables<'notices'>;
export type NoticeInsert = TablesInsert<'notices'>;

class NoticesRepository extends ContentRepository<NoticeInsert, NoticeRow> {
  tableName = 'notices' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['title', 'excerpt'];
}

export const noticesRepository = new NoticesRepository();
