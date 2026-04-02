import { createPublicPaginatedHandler } from '@/backend/handlers/public-content.handler';
import { newsRepository } from '@/backend/repositories/content';

export const GET = createPublicPaginatedHandler(newsRepository);
