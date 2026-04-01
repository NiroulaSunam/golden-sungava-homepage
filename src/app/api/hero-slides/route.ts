import { createPublicListHandler } from '@/backend/handlers/public-content.handler';
import { heroSlidesRepository } from '@/backend/repositories/content';

export const GET = createPublicListHandler(heroSlidesRepository);
