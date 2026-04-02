import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type ActivityRow = Tables<'activities'>;
export type ActivityInsert = TablesInsert<'activities'>;

class ActivitiesRepository extends ContentRepository<ActivityInsert, ActivityRow> {
  tableName = 'activities' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['name', 'description'];
}

export const activitiesRepository = new ActivitiesRepository();
