'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { navigationCreateSchema, navigationUpdateSchema } from '@/backend/services/schemas';
import { BilingualInput } from '@/components/shared/bilingual-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { toast } from 'sonner';

interface NavItem {
  id: string;
  label: Record<string, string>;
  href: string;
  parent_id: string | null;
  sort_order: number;
  status: string;
}

interface ListResponse {
  data: NavItem[];
  meta: { total: number };
}

const NavigationPage = () => {
  const { adminFetch, isLoading } = useAdminApi();
  const [items, setItems] = useState<NavItem[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<NavItem | null>(null);

  const fetchItems = useCallback(async () => {
    const { data } = await adminFetch<ListResponse>('/api/admin/navigation?limit=100&sortBy=sort_order&sortOrder=asc');
    if (data) setItems(data.data);
  }, [adminFetch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver((editItem ? navigationUpdateSchema : navigationCreateSchema) as any),
  });

  const handleEdit = (item: NavItem) => {
    setEditItem(item);
    form.reset(item);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    form.reset({ label: { en: '', np: '' }, href: '', parent_id: null });
    setFormOpen(true);
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    const url = editItem
      ? `/api/admin/navigation?id=${editItem.id}`
      : '/api/admin/navigation';
    const method = editItem ? 'PATCH' : 'POST';

    const { error } = await adminFetch(url, { method, body: JSON.stringify(values) });

    if (error) {
      toast.error(error);
    } else {
      toast.success(editItem ? 'Updated' : 'Created');
      setFormOpen(false);
      setEditItem(null);
      fetchItems();
    }
  });

  const handleDelete = async (id: string) => {
    const { error } = await adminFetch(`/api/admin/navigation?id=${id}`, { method: 'DELETE' });
    if (error) toast.error(error);
    else { toast.success('Deleted'); fetchItems(); }
  };

  const topLevel = items.filter((i) => !i.parent_id);
  const childrenOf = (parentId: string) => items.filter((i) => i.parent_id === parentId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Navigation</h1>
        <Button size="sm" onClick={handleAdd}>
          <Plus className="mr-1 h-4 w-4" /> Add Item
        </Button>
      </div>

      <div className="space-y-1">
        {topLevel.map((item) => (
          <div key={item.id}>
            <div className="flex items-center gap-2 rounded-md border p-3">
              <span className="flex-1 font-medium">{item.label?.en || '—'}</span>
              <span className="text-sm text-muted-foreground">{item.href}</span>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
            {childrenOf(item.id).map((child) => (
              <div key={child.id} className="ml-8 flex items-center gap-2 rounded-md border-l-2 border-b p-2">
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                <span className="flex-1 text-sm">{child.label?.en || '—'}</span>
                <span className="text-xs text-muted-foreground">{child.href}</span>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(child)}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(child.id)}>
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        ))}
        {topLevel.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">No navigation items yet</p>
        )}
      </div>

      <Dialog open={formOpen} onOpenChange={(isOpen) => !isOpen && setFormOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editItem ? 'Edit Navigation Item' : 'Add Navigation Item'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <BilingualInput name="label" label="Label" control={form.control} required />
            <div className="space-y-2">
              <Label>URL Path</Label>
              <Input {...form.register('href')} placeholder="/about" disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label>Parent Item</Label>
              <Select
                value={form.watch('parent_id') ?? 'none'}
                onValueChange={(v) => form.setValue('parent_id', v === 'none' ? null : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None (top level)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (top level)</SelectItem>
                  {topLevel
                    .filter((i) => i.id !== editItem?.id)
                    .map((i) => (
                      <SelectItem key={i.id} value={i.id}>{i.label?.en || i.href}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : editItem ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavigationPage;
