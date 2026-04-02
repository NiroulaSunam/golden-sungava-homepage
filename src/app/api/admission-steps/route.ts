import { createPublicListHandler } from '@/backend/handlers/public-content.handler';
import { admissionStepsRepository } from '@/backend/repositories/content';

export const GET = createPublicListHandler(admissionStepsRepository);
