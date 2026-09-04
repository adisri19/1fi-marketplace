import React, { useState } from 'react';
import { useBrands } from '../../hooks/useBrands';
import BrandCard from './BrandCard';
import { Search, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { Skeleton } from '../../components/ui/Skeleton';

export default function TopBrandsTab() {
  const { data: brands, isLoading, isError, error, refetch } = useBrands();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = (brands || []).filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Official Brand Stores
          </h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            Direct OEM warranty • 100% paperless mutual fund EMI checkout
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brands..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E4E4E7] rounded-pill text-sm focus:outline-none focus:border-[#4B1FD6] focus:ring-2 focus:ring-[#EDE9FE] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-white rounded-card p-5 border border-zinc-200 shadow-xs space-y-3">
              <Skeleton className="w-16 h-16 rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-4 w-1/2 pt-2" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center my-6">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-red-900 mb-1">Failed to load brands</h3>
          <p className="text-xs text-red-600 mb-4">{error?.message || 'Error communicating with brand API'}</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-pill"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Brand Grid */}
      {!isLoading && !isError && filteredBrands.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}

      {/* Empty Search Result */}
      {!isLoading && !isError && filteredBrands.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E4E7] shadow-sm my-6">
          <p className="text-zinc-600 font-semibold mb-1">No brands matching "{searchQuery}"</p>
          <p className="text-zinc-400 text-xs">Try searching for Apple, Samsung, OnePlus, Google, etc.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-1.5 text-xs font-semibold text-[#4B1FD6] bg-[#EDE9FE] rounded-pill hover:bg-violet-200 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
