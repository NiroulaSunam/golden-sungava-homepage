import { createAdminContentHandlers } from '@/backend/handlers/admin-content.handler';
import { activitiesService } from '@/backend/services/content';

const handlers = createAdminContentHandlers({
  service: activitiesService,
  resourceName: 'content',
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
