import { createPublicSingletonHandler } from '@/backend/handlers/public-content.handler';
import { siteConfigRepository } from '@/backend/repositories/content';

export const GET = createPublicSingletonHandler(siteConfigRepository);
