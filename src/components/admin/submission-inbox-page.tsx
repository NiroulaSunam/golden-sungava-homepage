'use client';

import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, RefreshCcw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SubmissionInboxPageProps<TItem extends { id: string; created_at: string; status: string }> {
  title: string;
  description: string;
  apiPath: string;
  emptyMessage: string;
  columns: {
    key: string;
    label: string;
    render: (item: TItem) => React.ReactNode;
  }[];
  renderActions?: (item: TItem) => React.ReactNode;
}

interface AdminListResponse<TItem> {
  data: TItem[];
}

const formatDateTime = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleString();
};

export const SubmissionInboxPage = <TItem extends { id: string; created_at: string; status: string }>({
  title,
  description,
  apiPath,
  emptyMessage,
  columns,
  renderActions,
}: SubmissionInboxPageProps<TItem>) => {
  const { adminFetch, isLoading } = useAdminApi();
  const [items, setItems] = useState<TItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    const response = await adminFetch<AdminListResponse<TItem>>(apiPath);
    if (response.error) {
      setError(response.error);
      return;
    }

    setError(null);
    setItems(response.data?.data ?? []);
  }, [adminFetch, apiPath]);

  useEffect(() => {
    const run = async () => {
      await loadItems();
    };

    void run();
  }, [loadItems]);

  const markResolved = async (id: string) => {
    const response = await adminFetch(`${apiPath}?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'resolved' }),
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Updated');
    loadItems();
  };

  const removeItem = async (id: string) => {
    const response = await adminFetch(`${apiPath}?id=${id}`, {
      method: 'DELETE',
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Deleted');
    loadItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Button type="button" variant="outline" onClick={loadItems} disabled={isLoading} className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 3} className="py-8 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.key} className="max-w-xs whitespace-normal">
                      {column.render(item)}
                    </TableCell>
                  ))}
                  <TableCell>{formatDateTime(item.created_at)}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'resolved' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {renderActions ? renderActions(item) : null}
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => markResolved(item.id)}
                        disabled={item.status === 'resolved'}
                        aria-label="Mark resolved"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                        aria-label="Delete submission"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
