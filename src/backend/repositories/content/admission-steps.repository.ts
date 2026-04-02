import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type AdmissionStepRow = Tables<'admission_steps'>;
export type AdmissionStepInsert = TablesInsert<'admission_steps'>;

class AdmissionStepsRepository extends ContentRepository<AdmissionStepInsert, AdmissionStepRow> {
  tableName = 'admission_steps' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['title', 'description'];
}

export const admissionStepsRepository = new AdmissionStepsRepository();
