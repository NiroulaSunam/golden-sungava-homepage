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
      } else {
        roots.push(node);
      }
    }

    return roots;
  };
}

export const navigationRepository = new NavigationRepository();
