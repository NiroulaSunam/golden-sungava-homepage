import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type DownloadRow = Tables<'downloads'>;
export type DownloadInsert = TablesInsert<'downloads'>;

class DownloadsRepository extends ContentRepository<DownloadInsert, DownloadRow> {
  tableName = 'downloads' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['title', 'description'];
}

export const downloadsRepository = new DownloadsRepository();
