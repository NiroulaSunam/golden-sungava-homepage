'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ContentCard } from './content-card';
import { SkeletonLoader } from './skeleton-loader';
import { Pagination } from './pagination';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 9;

interface ListingItem {
  id: number;
  title: string;
  date?: string;
  excerpt?: string;
  imageUrl: string;
  category?: string;
  author?: string;
}

interface ListingPageProps {
  items: ListingItem[];
  basePath: string;
  isLoading?: boolean;
  searchPlaceholder?: string;
  categories?: string[];
  className?: string;
}

export const ListingPage = ({
  items,
  basePath,
  isLoading = false,
  searchPlaceholder = 'Search...',
  categories = [],
  className,
}: ListingPageProps) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = items;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt?.toLowerCase().includes(q),
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category === activeCategory);
    }

    return result;
  }, [items, search, activeCategory]);

  const safeFiltered = Array.isArray(filtered) ? filtered : [];
  const totalPages = Math.ceil(safeFiltered.length / ITEMS_PER_PAGE);
  const paginated = safeFiltered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset page when filters change
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonLoader key={i} variant="card" />
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Search + Filter Bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategory('all')}
              className={cn(
                'rounded-lg px-4 py-1.5 text-xs font-semibold transition-all',
                activeCategory === 'all'
                  ? 'bg-primary text-white shadow-sm shadow-primary/20'
                  : 'bg-muted text-muted-foreground hover:bg-primary/5 hover:text-primary',
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategory(cat)}
                className={cn(
                  'rounded-lg px-4 py-1.5 text-xs font-semibold transition-all',
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm shadow-primary/20'
                    : 'bg-muted text-muted-foreground hover:bg-primary/5 hover:text-primary',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Grid */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Search className="mb-3 h-8 w-8 text-muted-foreground/30" />
          <p className="text-muted-foreground">No items found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              href={`${basePath}/${item.id}`}
              imageUrl={item.imageUrl}
              date={item.date}
              excerpt={item.excerpt}
              author={item.author}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-10"
      />
    </div>
  );
};
