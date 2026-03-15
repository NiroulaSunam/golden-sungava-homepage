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

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategory('all')}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                activeCategory === 'all' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground',
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
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  activeCategory === cat ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground',
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
        <p className="py-12 text-center text-muted-foreground">No items found.</p>
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
        className="mt-8"
      />
    </div>
  );
};
