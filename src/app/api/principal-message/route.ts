import { createPublicSingletonHandler } from '@/backend/handlers/public-content.handler';
import { principalMessageRepository } from '@/backend/repositories/content';

export const GET = createPublicSingletonHandler(principalMessageRepository);
