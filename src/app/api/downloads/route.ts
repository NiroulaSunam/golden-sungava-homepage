import { createPublicPaginatedHandler } from '@/backend/handlers/public-content.handler';
import { downloadsRepository } from '@/backend/repositories/content';

export const GET = createPublicPaginatedHandler(downloadsRepository, { sortBy: 'sort_order', sortOrder: 'asc' });
