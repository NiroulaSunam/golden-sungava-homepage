/**
 * Base Repository
 * Provides common CRUD operations for all repositories using Supabase
 */

import { supabaseAdmin } from '../db';
import { POSTGREST_ERROR } from '@/lib/constants';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchOptions extends PaginationOptions {
  searchTerm?: string;
  searchBy?: string;
  searchFields?: string[];
  includeDeleted?: boolean;
}

export interface FilterOptions {
  [key: string]: unknown;
}

export abstract class BaseRepository<TInsert, TSelect> {
  protected abstract tableName: string;
  protected abstract idColumn: string;

  /**
   * Get Supabase client instance
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected get db(): any {
    return supabaseAdmin;
  }

  /**
   * Find all records (excluding soft-deleted)
   */
  async findAll(options?: PaginationOptions): Promise<TSelect[]> {
    let query = this.db
      .from(this.tableName)
      .select('*')
      .is('deleted_at', null);

    if (options?.sortBy) {
      query = query.order(options.sortBy, {
        ascending: options.sortOrder !== 'desc',
      });
    }

    if (options?.limit) {
      const offset = options.page && options.page > 1
        ? (options.page - 1) * options.limit
        : 0;
      query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    }

    return (data || []) as TSelect[];
  }

  /**
   * Find all records with filters
   */
  async findWhere(filters: FilterOptions, options?: PaginationOptions): Promise<TSelect[]> {
    let query = this.db
      .from(this.tableName)
      .select('*')
      .is('deleted_at', null);

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }

    if (options?.sortBy) {
      query = query.order(options.sortBy, {
        ascending: options.sortOrder !== 'desc',
      });
    }

    if (options?.limit) {
      const offset = options.page && options.page > 1
        ? (options.page - 1) * options.limit
        : 0;
      query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    }

    return (data || []) as TSelect[];
  }

  /**
   * Find by ID
   */
  async findById(id: string): Promise<TSelect | null> {
    const { data, error } = await this.db
      .from(this.tableName)
      .select('*')
      .eq(this.idColumn, id)
      .is('deleted_at', null)
      .single();

    if (error) {
      if (error.code === POSTGREST_ERROR.NOT_FOUND) {
        return null;
      }
      throw new Error(`Failed to fetch ${this.tableName} by ID: ${error.message}`);
    }

    return data as TSelect;
  }

  /**
   * Create a new record
   */
  async create(data: TInsert): Promise<TSelect> {
    const { data: result, error } = await this.db
      .from(this.tableName)
      .insert(data as Record<string, unknown>)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create ${this.tableName}: ${error.message}`);
    }

    return result as TSelect;
  }

  /**
   * Create multiple records
   */
  async createMany(records: TInsert[]): Promise<TSelect[]> {
    const { data, error } = await this.db
      .from(this.tableName)
      .insert(records as Record<string, unknown>[])
      .select();

    if (error) {
      throw new Error(`Failed to create ${this.tableName} records: ${error.message}`);
    }

    return (data || []) as TSelect[];
  }

  /**
   * Update a record by ID
   */
  async update(id: string, data: Partial<TInsert>): Promise<TSelect | null> {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: result, error } = await this.db
      .from(this.tableName)
      .update(updateData as Record<string, unknown>)
      .eq(this.idColumn, id)
      .select()
      .single();

    if (error) {
      if (error.code === POSTGREST_ERROR.NOT_FOUND) {
        return null;
      }
      throw new Error(`Failed to update ${this.tableName}: ${error.message}`);
    }

    return result as TSelect;
  }

  /**
   * Soft delete a record
   */
  async softDelete(id: string): Promise<boolean> {
    const { error, count } = await this.db
      .from(this.tableName)
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq(this.idColumn, id);

    if (error) {
      throw new Error(`Failed to soft delete ${this.tableName}: ${error.message}`);
    }

    return (count ?? 0) > 0;
  }

  /**
   * Hard delete a record (use with caution)
   * Only use for Category 3 tables (disposable data)
   */
  async hardDelete(id: string): Promise<boolean> {
    const { error, count } = await this.db
      .from(this.tableName)
      .delete()
      .eq(this.idColumn, id);

    if (error) {
      throw error;
    }

    return (count ?? 0) > 0;
  }

  /**
   * Restore a soft-deleted record
   */
  async restore(id: string): Promise<TSelect | null> {
    const { data: result, error } = await this.db
      .from(this.tableName)
      .update({
        deleted_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq(this.idColumn, id)
      .select()
      .single();

    if (error) {
      if (error.code === POSTGREST_ERROR.NOT_FOUND) {
        return null;
      }
      throw new Error(`Failed to restore ${this.tableName}: ${error.message}`);
    }

    return result as TSelect;
  }

  /**
   * Find all records including soft-deleted (for admin views)
   */
  async findAllIncludingDeleted(options?: PaginationOptions): Promise<TSelect[]> {
    let query = this.db
      .from(this.tableName)
      .select('*');

    if (options?.sortBy) {
      query = query.order(options.sortBy, {
        ascending: options.sortOrder !== 'desc',
      });
    }

    if (options?.limit) {
      const offset = options.page && options.page > 1
        ? (options.page - 1) * options.limit
        : 0;
      query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    }

    return (data || []) as TSelect[];
  }

  /**
   * Find only soft-deleted records
   */
  async findDeleted(options?: PaginationOptions): Promise<TSelect[]> {
    let query = this.db
      .from(this.tableName)
      .select('*')
      .not('deleted_at', 'is', null);

    if (options?.sortBy) {
      query = query.order(options.sortBy, {
        ascending: options.sortOrder !== 'desc',
      });
    }

    if (options?.limit) {
      const offset = options.page && options.page > 1
        ? (options.page - 1) * options.limit
        : 0;
      query = query.range(offset, offset + options.limit - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch deleted ${this.tableName}: ${error.message}`);
    }

    return (data || []) as TSelect[];
  }

  /**
   * Count records (excluding soft-deleted)
   */
  async count(filters?: FilterOptions): Promise<number> {
    let query = this.db
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .is('deleted_at', null);

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Failed to count ${this.tableName}: ${error.message}`);
    }

    return count ?? 0;
  }

  /**
   * Count only soft-deleted records
   */
  async countDeleted(filters?: FilterOptions): Promise<number> {
    let query = this.db
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .not('deleted_at', 'is', null);

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    const { count, error } = await query;

    if (error) {
      throw new Error(`Failed to count deleted ${this.tableName}: ${error.message}`);
    }

    return count ?? 0;
  }

  /**
   * Check if a record exists
   */
  async exists(id: string): Promise<boolean> {
    const result = await this.findById(id);
    return result !== null;
  }

  /**
   * Find with pagination and return paginated result
   */
  async findPaginated(
    options: PaginationOptions,
    filters?: FilterOptions
  ): Promise<PaginatedResult<TSelect>> {
    const page = options.page || 1;
    const limit = options.limit || 20;

    const [data, total] = await Promise.all([
      filters ? this.findWhere(filters, options) : this.findAll(options),
      this.count(filters),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Find records with search, sorting, and pagination
   */
  async findWithSearch(
    options: SearchOptions,
    filters?: FilterOptions
  ): Promise<PaginatedResult<TSelect>> {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const offset = (page - 1) * limit;

    let query = this.db
      .from(this.tableName)
      .select('*', { count: 'exact' });

    if (!options.includeDeleted) {
      query = query.is('deleted_at', null);
    }

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    if (options.searchTerm) {
      if (options.searchBy) {
        query = query.ilike(options.searchBy, `%${options.searchTerm}%`);
      } else if (options.searchFields && options.searchFields.length > 0) {
        const conditions = options.searchFields
          .map(field => `${field}.ilike.%${options.searchTerm}%`)
          .join(',');
        query = query.or(conditions);
      }
    }

    if (options.sortBy) {
      query = query.order(options.sortBy, {
        ascending: options.sortOrder !== 'desc',
      });
    }

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      throw new Error(`Failed to search ${this.tableName}: ${error.message}`);
    }

    const total = count ?? 0;

    return {
      data: (data || []) as TSelect[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Upsert a record (insert or update)
   */
  async upsert(data: TInsert, onConflictColumns?: string[]): Promise<TSelect> {
    const { data: result, error } = await this.db
      .from(this.tableName)
      .upsert(data as Record<string, unknown>, {
        onConflict: onConflictColumns?.join(',') || this.idColumn,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to upsert ${this.tableName}: ${error.message}`);
    }

    return result as TSelect;
  }
}
