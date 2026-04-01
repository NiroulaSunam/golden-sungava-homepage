import { createPublicPaginatedHandler } from '@/backend/handlers/public-content.handler';
import { blogsRepository } from '@/backend/repositories/content';

export const GET = createPublicPaginatedHandler(blogsRepository);
