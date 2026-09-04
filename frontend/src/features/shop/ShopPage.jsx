import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import HeroBanner from './HeroBanner';
import TabSwitcher from './TabSwitcher';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../../components/ui/Skeleton';
import BottomNav from '../../components/layout/BottomNav';
import { AlertCircle, RefreshCw, Sparkles, Store, Building2 } from 'lucide-react';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('1fi-marketplace');
  const { data: products, isLoading, isError, error, refetch } = useProducts();

  return (
    <main className="min-h-screen pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* 1Fi App Style Hero Banner */}
      <HeroBanner />

      {/* Pill Tab Switcher */}
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'top-brands' && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E4E7] shadow-sm my-8">
          <div className="w-16 h-16 bg-violet-100 text-[#4B1FD6] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Top Brands Direct Stores</h2>
          <p className="text-zinc-500 max-w-md mx-auto text-sm">
            Exclusive tie-ups with Apple, Samsung, OnePlus, and more coming soon.
          </p>
          <button
            onClick={() => setActiveTab('1fi-marketplace')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#4B1FD6] text-white text-sm font-semibold rounded-pill hover:bg-[#3B0764] transition-colors"
          >
            Explore 1Fi Marketplace
          </button>
        </div>
      )}

      {activeTab === 'nearby-stores' && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E4E7] shadow-sm my-8">
          <div className="w-16 h-16 bg-violet-100 text-[#4B1FD6] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Nearby Partner Retail Stores</h2>
          <p className="text-zinc-500 max-w-md mx-auto text-sm">
            Walk into partner electronic stores and scan QR to pay using your mutual funds.
          </p>
          <button
            onClick={() => setActiveTab('1fi-marketplace')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#4B1FD6] text-white text-sm font-semibold rounded-pill hover:bg-[#3B0764] transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      )}

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
              ✦ Verified Genuine Devices
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
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
          {!isLoading && !isError && products && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty state if no products */}
          {!isLoading && !isError && (!products || products.length === 0) && (
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
