import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type NewsRow = Tables<'news'>;
export type NewsInsert = TablesInsert<'news'>;

class NewsRepository extends ContentRepository<NewsInsert, NewsRow> {
  tableName = 'news' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['title', 'excerpt', 'content'];
}

export const newsRepository = new NewsRepository();
