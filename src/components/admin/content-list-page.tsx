'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { toast } from 'sonner';
import { CONTENT_STATUS, PAGINATION_CONFIG } from '@/lib/constants';
import { ContentPreview } from '@/components/admin/content-preview';
import type { FieldConfig } from '@/components/admin/content-form-dialog';

export interface ColumnDef {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface ContentListPageProps {
  title: string;
  apiPath: string;
  columns: ColumnDef[];
  showStatus?: boolean;
  /** Field configs for the preview dialog — when provided, shows a view (eye) button */
  previewFields?: FieldConfig[];
  renderForm: (props: {
    open: boolean;
    onClose: () => void;
    editItem: Record<string, unknown> | null;
    onSuccess: () => void;
  }) => React.ReactNode;
}

interface ListResponse {
  data: Record<string, unknown>[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const ContentListPage = ({
  title,
  apiPath,
  columns,
  showStatus = true,
  previewFields,
  renderForm,
}: ContentListPageProps) => {
  const { adminFetch } = useAdminApi();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: PAGINATION_CONFIG.DEFAULT_PAGE_SIZE as number, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, unknown> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, unknown> | null>(null);
  const [previewItem, setPreviewItem] = useState<Record<string, unknown> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams({ page: String(page), limit: String(PAGINATION_CONFIG.DEFAULT_PAGE_SIZE) });
    if (search) params.set('search', search);

    const { data } = await adminFetch<ListResponse>(`${apiPath}?${params}`);
    if (data) {
      setItems(data.data);
      setMeta(data.meta);
    }
  }, [adminFetch, apiPath, page, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    const { error } = await adminFetch(`${apiPath}?id=${deleteTarget.id}`, { method: 'DELETE' });

    if (error) {
      toast.error(error);
    } else {
      toast.success('Deleted successfully');
      fetchItems();
    }

    setDeleteTarget(null);
    setIsDeleting(false);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditItem(null);
    fetchItems();
  };

  const handleEdit = (item: Record<string, unknown>) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setFormOpen(true);
  };

  const getDisplayValue = (value: unknown): string => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'object' && 'en' in (value as Record<string, unknown>)) {
      return (value as Record<string, string>).en || '—';
    }
    return String(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <Button onClick={handleAdd} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              {showStatus && <TableHead className="w-16">Status</TableHead>}
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (showStatus ? 2 : 1)} className="text-center text-muted-foreground py-8">
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={String(item.id)}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(item[col.key], item)
                        : getDisplayValue(item[col.key])
                      }
                    </TableCell>
                  ))}
                  {showStatus && (
                    <TableCell>
                      <Badge variant={item.status === CONTENT_STATUS.PUBLISHED ? 'default' : 'secondary'}>
                        {String(item.status)}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex gap-1">
                      {previewFields && (
                        <Button variant="ghost" size="icon" onClick={() => setPreviewItem(item)} title="Preview">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(item)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Page {meta.page} of {meta.totalPages} ({meta.total} items)</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled={page >= meta.totalPages} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              This will soft-delete the item. It can be restored later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview dialog */}
      {previewFields && (
        <Dialog open={!!previewItem} onOpenChange={(open) => !open && setPreviewItem(null)}>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Preview</DialogTitle>
            </DialogHeader>
            {previewItem && (
              <ContentPreview fields={previewFields} values={previewItem} />
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewItem(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Form dialog (render prop) */}
      {renderForm({
        open: formOpen,
        onClose: () => { setFormOpen(false); setEditItem(null); },
        editItem,
        onSuccess: handleFormSuccess,
      })}
    </div>
  );
};
