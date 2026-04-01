import { createAdminSingletonHandlers } from '@/backend/handlers/admin-singleton.handler';
import { siteConfigRepository } from '@/backend/repositories/content';
import { siteConfigUpdateSchema } from '@/backend/services/schemas';

const handlers = createAdminSingletonHandlers({
  repository: siteConfigRepository,
  resourceName: 'site-config',
  updateSchema: siteConfigUpdateSchema,
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
