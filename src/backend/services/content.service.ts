/**
 * Content Service Factory
 * Creates a service for any content type with Zod validation and audit logging.
 * New content is created as draft; updates preserve existing status.
 */

import type { z } from 'zod';
import type { ContentRepository, Lang } from '@/backend/repositories/content.repository';
import type { PaginatedResult, SearchOptions } from '@/backend/repositories/base.repository';
import type { FilterOptions } from '@/backend/repositories/base.repository';
import { auditService } from './audit.service';
import { CONTENT_STATUS, AUDIT_ACTION } from '@/lib/constants';

export interface ContentServiceConfig<TCreate, TUpdate, TInsert, TSelect> {
  repository: ContentRepository<TInsert, TSelect>;
  resourceName: string;
  createSchema: z.ZodType<TCreate>;
  updateSchema: z.ZodType<TUpdate>;
}

export interface ContentService<TCreate, TUpdate, TSelect> {
  list: (options: SearchOptions, filters?: FilterOptions) => Promise<PaginatedResult<TSelect>>;
  listPublished: (lang: Lang, options?: SearchOptions) => Promise<PaginatedResult<TSelect>>;
  getById: (id: string) => Promise<TSelect | null>;
  create: (data: unknown, userId: string) => Promise<TSelect>;
  update: (id: string, data: unknown, userId: string) => Promise<TSelect | null>;
  remove: (id: string, userId: string) => Promise<boolean>;
  restore: (id: string, userId: string) => Promise<TSelect | null>;
}

export const createContentService = <TCreate, TUpdate, TInsert, TSelect extends { id: string }>({
  repository,
  resourceName,
  createSchema,
  updateSchema,
}: ContentServiceConfig<TCreate, TUpdate, TInsert, TSelect>): ContentService<TCreate, TUpdate, TSelect> => {
  const list = async (options: SearchOptions, filters?: FilterOptions): Promise<PaginatedResult<TSelect>> => {
    return repository.findWithSearch(options, filters);
  };

  const listPublished = async (lang: Lang, options?: SearchOptions): Promise<PaginatedResult<TSelect>> => {
    return repository.findPublished(lang, options);
  };

  const getById = async (id: string): Promise<TSelect | null> => {
    return repository.findById(id);
  };

  const create = async (data: unknown, userId: string): Promise<TSelect> => {
    const validated = createSchema.parse(data) as TCreate;
    const insertData = { ...validated, status: CONTENT_STATUS.DRAFT } as unknown as TInsert;
    const result = await repository.create(insertData);

    await auditService.log({
      userId,
      action: AUDIT_ACTION.CREATE,
      resource: resourceName,
      resourceId: result.id,
      details: validated as Record<string, unknown>,
    });

    return result;
  };

  const update = async (id: string, data: unknown, userId: string): Promise<TSelect | null> => {
    const validated = updateSchema.parse(data) as TUpdate;
    const result = await repository.update(id, validated as unknown as Partial<TInsert>);

    if (result) {
      await auditService.log({
        userId,
        action: AUDIT_ACTION.UPDATE,
        resource: resourceName,
        resourceId: id,
        details: validated as Record<string, unknown>,
      });
    }

    return result;
  };

  const remove = async (id: string, userId: string): Promise<boolean> => {
    const success = await repository.softDelete(id);

    if (success) {
      await auditService.log({
        userId,
        action: AUDIT_ACTION.DELETE,
        resource: resourceName,
        resourceId: id,
        details: {},
      });
    }

    return success;
  };

  const restore = async (id: string, userId: string): Promise<TSelect | null> => {
    const result = await repository.restore(id);

    if (result) {
      await auditService.log({
        userId,
        action: AUDIT_ACTION.UPDATE,
        resource: resourceName,
        resourceId: id,
        details: { restored: true },
      });
    }

    return result;
  };

  return { list, listPublished, getById, create, update, remove, restore };
};
