import { createAdminContentHandlers } from '@/backend/handlers/admin-content.handler';
import { galleryEventsService } from '@/backend/services/content';

const handlers = createAdminContentHandlers({
  service: galleryEventsService,
  resourceName: 'gallery',
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PATCH = handlers.PATCH;
export const DELETE = handlers.DELETE;
