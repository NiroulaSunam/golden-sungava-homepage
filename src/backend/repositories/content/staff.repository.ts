import { BaseRepository } from '../base.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type StaffRow = Tables<'staff'>;
export type StaffInsert = TablesInsert<'staff'>;

class StaffRepository extends BaseRepository<StaffInsert, StaffRow> {
  tableName = 'staff' as const;
  idColumn = 'id' as const;
}

export const staffRepository = new StaffRepository();
