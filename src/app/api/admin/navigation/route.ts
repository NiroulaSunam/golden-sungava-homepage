import { createAdminContentHandlers } from '@/backend/handlers/admin-content.handler';
import { navigationService } from '@/backend/services/content';

const handlers = createAdminContentHandlers({
  service: navigationService,
  resourceName: 'navigation',
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
