import { createPublicListHandler } from '@/backend/handlers/public-content.handler';
import { facilitiesRepository } from '@/backend/repositories/content';

export const GET = createPublicListHandler(facilitiesRepository);
