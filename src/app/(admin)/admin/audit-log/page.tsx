'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { AUDIT_ACTION } from '@/lib/constants';

interface AuditEntry {
  id: string;
  user_id: string | null;
  action: string;
  resource: string;
  resource_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

interface ListResponse {
  data: AuditEntry[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

const ACTION_COLORS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  [AUDIT_ACTION.CREATE]: 'default',
  [AUDIT_ACTION.UPDATE]: 'secondary',
  [AUDIT_ACTION.DELETE]: 'destructive',
  [AUDIT_ACTION.PUBLISH]: 'outline',
};

const AuditLogPage = () => {
  const { adminFetch } = useAdminApi();
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 20, totalPages: 0 });
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    const params = new URLSearchParams({
      page: String(page),
      limit: '20',
      sortBy: 'created_at',
      sortOrder: 'desc',
    });

    // The admin API list uses the generic content handler with search params
    // Audit log doesn't go through the content handler — it needs a direct query
    // For now, we use the admin API path pattern
    const { data } = await adminFetch<ListResponse>(`/api/admin/audit-log?${params}`);
    if (data) {
      let filtered = data.data;
      if (actionFilter !== 'all') {
        filtered = filtered.filter((e) => e.action === actionFilter);
      }
      setEntries(filtered);
      setMeta(data.meta);
    }
  }, [adminFetch, page, actionFilter]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Audit Log</h1>
          <p className="mt-1 text-sm text-muted-foreground">Read-only history of all content changes</p>
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            <SelectItem value={AUDIT_ACTION.CREATE}>Create</SelectItem>
            <SelectItem value={AUDIT_ACTION.UPDATE}>Update</SelectItem>
            <SelectItem value={AUDIT_ACTION.DELETE}>Delete</SelectItem>
            <SelectItem value={AUDIT_ACTION.PUBLISH}>Publish</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Resource ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No audit entries found
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <>
                  <TableRow
                    key={entry.id}
                    className="cursor-pointer"
                    onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                  >
                    <TableCell>
                      {expandedId === entry.id
                        ? <ChevronDown className="h-4 w-4" />
                        : <ChevronRight className="h-4 w-4" />
                      }
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(entry.created_at)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={ACTION_COLORS[entry.action] || 'secondary'}>
                        {entry.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{entry.resource}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {entry.resource_id ? entry.resource_id.slice(0, 8) : '—'}
                    </TableCell>
                  </TableRow>
                  {expandedId === entry.id && (
                    <TableRow key={`${entry.id}-details`}>
                      <TableCell colSpan={5}>
                        <pre className="max-h-48 overflow-auto rounded bg-muted p-3 text-xs">
                          {JSON.stringify(entry.details, null, 2)}
                        </pre>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Page {meta.page} of {meta.totalPages}</span>
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
    </div>
  );
};

export default AuditLogPage;
