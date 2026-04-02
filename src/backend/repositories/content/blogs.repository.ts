import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type BlogRow = Tables<'blogs'>;
export type BlogInsert = TablesInsert<'blogs'>;

class BlogsRepository extends ContentRepository<BlogInsert, BlogRow> {
  tableName = 'blogs' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['title', 'excerpt', 'content'];
}

export const blogsRepository = new BlogsRepository();
