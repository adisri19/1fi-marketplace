import React from 'react';

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-card p-4 border border-[#E4E4E7] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between">
      <div>
        <div className="w-full h-[180px] bg-gray-100 rounded-lg animate-pulse mb-3" />
        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse mb-1.5" />
        <div className="h-4 w-3/5 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="h-5 w-20 bg-gray-200 rounded-pill animate-pulse mb-3" />
      </div>
      <div>
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-1.5" />
        <div className="h-3.5 w-40 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-10 w-full bg-gray-200 rounded-pill animate-pulse" />
      </div>
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Left panel skeleton */}
      <div className="md:col-span-5 space-y-4">
        <div className="aspect-square w-full bg-gray-200 rounded-xl animate-pulse" />
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[60px] h-[60px] bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>

      {/* Right panel skeleton */}
      <div className="md:col-span-7 space-y-6">
        <div className="space-y-2">
          <div className="h-3.5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-24 bg-gray-200 rounded-pill animate-pulse" />
        </div>

        <div className="h-px bg-gray-200" />

        <div className="flex items-baseline gap-3">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-36 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-16 bg-gray-200 rounded-pill animate-pulse" />
        </div>

        <div className="space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ))}
          </div>
          <div className="flex gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="w-24 h-9 rounded-pill bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>

        <div className="h-16 w-full bg-orange-100 rounded-xl animate-pulse" />

        <div className="space-y-3 pt-2">
          <div className="h-5 w-44 bg-gray-200 rounded animate-pulse" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StoreSkeleton() {
  return (
    <div className="bg-white rounded-card border border-[#E4E4E7] p-5 animate-pulse space-y-3">
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-3.5 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3.5 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="h-9 bg-gray-200 rounded-pill w-full" />
        <div className="h-9 bg-gray-200 rounded-pill w-full" />
      </div>
    </div>
  );
}
