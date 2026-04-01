import { createAdminSingletonHandlers } from '@/backend/handlers/admin-singleton.handler';
import { principalMessageRepository } from '@/backend/repositories/content';
import { principalMessageUpdateSchema } from '@/backend/services/schemas';

const handlers = createAdminSingletonHandlers({
  repository: principalMessageRepository,
  resourceName: 'site-config',
  updateSchema: principalMessageUpdateSchema,
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
