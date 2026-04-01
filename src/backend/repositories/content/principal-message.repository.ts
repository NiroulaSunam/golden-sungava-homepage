import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type PrincipalMessageRow = Tables<'principal_message'>;
export type PrincipalMessageInsert = TablesInsert<'principal_message'>;

class PrincipalMessageRepository extends ContentRepository<PrincipalMessageInsert, PrincipalMessageRow> {
  tableName = 'principal_message' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['name', 'title', 'message'];
}

export const principalMessageRepository = new PrincipalMessageRepository();
