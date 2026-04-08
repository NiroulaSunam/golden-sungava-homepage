'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { useAdminApi } from '@/lib/hooks/use-admin-api';
import { toast } from 'sonner';

interface DraftCountResponse {
  data: { count: number };
}

interface PublishResponse {
  data: { itemsPublished: number };
}

export const PublishButton = () => {
  const router = useRouter();
  const { adminFetch } = useAdminApi();
  const [draftCount, setDraftCount] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const fetchDraftCount = useCallback(async () => {
    const { data } = await adminFetch<DraftCountResponse>('/api/admin/publish/count');
    if (data) {
      setDraftCount(data.data.count);
    }
  }, [adminFetch]);

  useEffect(() => {
    fetchDraftCount();
  }, [fetchDraftCount]);

  useEffect(() => {
    const handleContentChanged = () => {
      fetchDraftCount();
    };

    window.addEventListener('content-changed', handleContentChanged);
    return () => window.removeEventListener('content-changed', handleContentChanged);
  }, [fetchDraftCount]);

  const handlePublish = async () => {
    setIsPublishing(true);

    const { data, error } = await adminFetch<PublishResponse>('/api/admin/publish', {
      method: 'POST',
    });

    if (error) {
      toast.error(`Publish failed: ${error}`);
    } else {
      toast.success(`Published ${data?.data.itemsPublished ?? 0} items`);
      await fetchDraftCount();
      window.dispatchEvent(new Event('content-published'));
      router.refresh();
    }

    setIsPublishing(false);
    setConfirmOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setConfirmOpen(true)}
        disabled={draftCount === 0}
        className="relative gap-1.5"
      >
        <Upload className="h-4 w-4" />
        <span className="hidden sm:inline">Publish</span>
        {draftCount > 0 && (
          <Badge variant="destructive" className="ml-1 h-5 min-w-5 px-1 text-xs">
            {draftCount}
          </Badge>
        )}
      </Button>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish All Drafts</DialogTitle>
            <DialogDescription>
              This will publish {draftCount} draft item{draftCount !== 1 ? 's' : ''} to the live website.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? 'Publishing...' : 'Publish Now'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
