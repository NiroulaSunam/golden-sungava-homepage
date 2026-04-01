import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type FacilityRow = Tables<'facilities'>;
export type FacilityInsert = TablesInsert<'facilities'>;

class FacilitiesRepository extends ContentRepository<FacilityInsert, FacilityRow> {
  tableName = 'facilities' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['name', 'description'];
}

export const facilitiesRepository = new FacilitiesRepository();
