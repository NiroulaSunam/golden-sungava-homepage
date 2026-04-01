import { ContentRepository } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';

export type EventRow = Tables<'events'>;
export type EventInsert = TablesInsert<'events'>;

class EventsRepository extends ContentRepository<EventInsert, EventRow> {
  tableName = 'events' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['title', 'venue', 'description'];
}

export const eventsRepository = new EventsRepository();
