import { createAdminContentHandlers } from '@/backend/handlers/admin-content.handler';
import { testimonialsService } from '@/backend/services/content';

const handlers = createAdminContentHandlers({
  service: testimonialsService,
  resourceName: 'content',
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
