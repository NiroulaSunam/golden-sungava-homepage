import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type PaymentMethodRow = Tables<'payment_methods'>;
export type PaymentMethodInsert = TablesInsert<'payment_methods'>;

class PaymentMethodsRepository extends ContentRepository<PaymentMethodInsert, PaymentMethodRow> {
  tableName = 'payment_methods' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['name', 'steps'];
}

export const paymentMethodsRepository = new PaymentMethodsRepository();
