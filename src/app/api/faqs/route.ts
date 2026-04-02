import { createPublicListHandler } from '@/backend/handlers/public-content.handler';
import { faqsRepository } from '@/backend/repositories/content';

export const GET = createPublicListHandler(faqsRepository);
