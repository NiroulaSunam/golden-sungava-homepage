import { ContentRepository, type Lang } from '../content.repository';
import type { Tables, TablesInsert } from '@/types/database.gen';
import { CONTENT_STATUS } from '@/lib/constants';

export type NavigationRow = Tables<'navigation_items'>;
export type NavigationInsert = TablesInsert<'navigation_items'>;

interface NavigationTreeNode extends Record<string, unknown> {
  children: NavigationTreeNode[];
}

class NavigationRepository extends ContentRepository<NavigationInsert, NavigationRow> {
  tableName = 'navigation_items' as const;
  idColumn = 'id' as const;
  bilingualColumns = ['label'];

  private softDeleteChildren = async (parentIds: string[]): Promise<void> => {
    if (parentIds.length === 0) {
      return;
    }

    const { data, error } = await this.db
      .from(this.tableName)
      .select('id')
      .in('parent_id', parentIds)
      .is('deleted_at', null);

    if (error) {
      throw new Error(`Failed to fetch child navigation items: ${error.message}`);
    }

    const childIds = (data || [])
      .map((item: { id?: string }) => item.id)
      .filter((id: string | undefined): id is string => typeof id === 'string');

    if (childIds.length === 0) {
      return;
    }

    const timestamp = new Date().toISOString();

    const { error: deleteError } = await this.db
      .from(this.tableName)
      .update({
        deleted_at: timestamp,
        updated_at: timestamp,
      })
      .in('id', childIds)
      .is('deleted_at', null);

    if (deleteError) {
      throw new Error(`Failed to delete child navigation items: ${deleteError.message}`);
    }

    await this.softDeleteChildren(childIds);
  };

  override softDelete = async (id: string): Promise<boolean> => {
    const deleted = await super.softDelete(id);

    if (deleted) {
      await this.softDeleteChildren([id]);
    }

    return deleted;
  };

  /**
   * Fetch all published navigation items and build a parent-child tree.
   */
  findTree = async (lang: Lang): Promise<NavigationTreeNode[]> => {
    const selectStr = this.buildPublishedSelectString(lang);

    const { data, error } = await this.db
      .from(this.tableName)
      .select(selectStr)
      .eq('status', CONTENT_STATUS.PUBLISHED)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch navigation tree: ${error.message}`);
    }

    const items = (data || []) as (NavigationRow & { children: NavigationTreeNode[] })[];

    // Build tree from flat list
    const itemMap = new Map<string, NavigationTreeNode>();
    const roots: NavigationTreeNode[] = [];

    for (const item of items) {
      const node: NavigationTreeNode = { ...item, children: [] };
      itemMap.set(item.id as string, node);
    }

    for (const item of items) {
      const node = itemMap.get(item.id as string)!;
      const parentId = (item as Record<string, unknown>).parent_id as string | null;

      if (parentId && itemMap.has(parentId)) {
        itemMap.get(parentId)!.children.push(node);
      } else if (!parentId) {
        roots.push(node);
      }
    }

    return roots;
  };
}

export const navigationRepository = new NavigationRepository();
