import { createPublicPaginatedHandler } from '@/backend/handlers/public-content.handler';
import { eventsRepository } from '@/backend/repositories/content';

export const GET = createPublicPaginatedHandler(eventsRepository);
