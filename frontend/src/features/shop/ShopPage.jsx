import React, { useState, useEffect, useRef } from 'react';
import { useInfiniteProducts } from '../../hooks/useProducts';
import HeroBanner from './HeroBanner';
import TabSwitcher from './TabSwitcher';
import ProductCard from './ProductCard';
import TopBrandsTab from './TopBrandsTab';
import NearbyStoresTab from './NearbyStoresTab';
import { ProductCardSkeleton } from '../../components/ui/Skeleton';
import BottomNav from '../../components/layout/BottomNav';
import { AlertCircle, RefreshCw, Sparkles, Loader2 } from 'lucide-react';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('1fi-marketplace');

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(12);

  const allProducts = data?.pages?.flatMap((page) => page.data || []) || [];
  const sentinelRef = useRef(null);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || activeTab !== '1fi-marketplace') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, activeTab]);

  return (
    <main className="min-h-screen pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* 1Fi App Style Hero Banner */}
      <HeroBanner />

      {/* Pill Tab Switcher */}
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab 1: Top Brands Tab */}
      {activeTab === 'top-brands' && <TopBrandsTab />}

      {/* Tab 2: Nearby Stores Tab */}
      {activeTab === 'nearby-stores' && <NearbyStoresTab />}

      {/* Tab 3: 1Fi Marketplace Tab */}
      {activeTab === '1fi-marketplace' && (
        <section aria-labelledby="marketplace-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 id="marketplace-heading" className="text-2xl font-bold text-zinc-900 tracking-tight">
                Smartphones on Mutual Fund EMI
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Zero processing fees • Instant online approval • Up to 60 months tenure
              </p>
            </div>
            <div className="text-xs font-semibold text-[#4B1FD6] bg-[#EDE9FE] px-3 py-1.5 rounded-pill self-start sm:self-auto">
              ✦ 50+ Verified Genuine Devices
            </div>
          </div>

          {/* Initial Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <ProductCardSkeleton key={n} />
              ))}
            </div>
          )}

          {/* Error State with Retry Button */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center my-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-red-900 mb-1">Failed to load marketplace products</h3>
              <p className="text-sm text-red-600 mb-4 max-w-md mx-auto">
                {error?.message || 'Something went wrong while communicating with the 1Fi backend.'}
              </p>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-pill shadow-sm transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Retry Loading
              </button>
            </div>
          )}

          {/* Product Grid */}
          {!isLoading && !isError && allProducts.length > 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Sentinel element for infinite scroll */}
              <div ref={sentinelRef} className="h-10 flex items-center justify-center">
                {isFetchingNextPage && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-pill border border-[#E4E4E7] shadow-xs text-xs font-semibold text-[#4B1FD6]">
                    <Loader2 className="w-4 h-4 animate-spin text-[#4B1FD6]" />
                    <span>Loading more smartphone deals...</span>
                  </div>
                )}
                {!hasNextPage && allProducts.length >= 12 && (
                  <span className="text-xs text-zinc-400 font-medium">
                    ✓ You have browsed all {allProducts.length} devices
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Empty state if no products */}
          {!isLoading && !isError && allProducts.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E4E7] shadow-sm my-8">
              <p className="text-zinc-500 text-base">No smartphone plans currently available.</p>
            </div>
          )}
        </section>
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
