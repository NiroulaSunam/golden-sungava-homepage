'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // Show max 5 page buttons
  const visiblePages = pages.filter((p) => {
    if (totalPages <= 5) return true;
    if (p === 1 || p === totalPages) return true;
    return Math.abs(p - currentPage) <= 1;
  });

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)} aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {visiblePages.map((page, i) => {
        const prevPage = visiblePages[i - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <span key={page} className="flex items-center">
            {showEllipsis && <span className="px-1 text-muted-foreground">...</span>}
            <button
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                'h-8 min-w-8 rounded-md px-2 text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};
