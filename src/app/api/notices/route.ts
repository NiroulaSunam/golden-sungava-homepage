import { createPublicPaginatedHandler } from '@/backend/handlers/public-content.handler';
import { noticesRepository } from '@/backend/repositories/content';

export const GET = createPublicPaginatedHandler(noticesRepository);
