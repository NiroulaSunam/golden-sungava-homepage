import { createPublicListHandler } from '@/backend/handlers/public-content.handler';
import { paymentMethodsRepository } from '@/backend/repositories/content';

export const GET = createPublicListHandler(paymentMethodsRepository);
