import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBrand, useBrandProducts } from '../../hooks/useBrands';
import ProductCard from '../shop/ProductCard';
import { ProductCardSkeleton } from '../../components/ui/Skeleton';
import BottomNav from '../../components/layout/BottomNav';
import { ArrowLeft, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

export default function BrandProductsPage() {
  const { brandId } = useParams();
  const { data: brand, isLoading: isBrandLoading } = useBrand(brandId);
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
    error,
    refetch,
  } = useBrandProducts(brandId);

  const isLoading = isBrandLoading || isProductsLoading;

  return (
    <main className="min-h-screen pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-[#4B1FD6] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Top Brands</span>
        </Link>
      </div>

      {/* Brand Header Banner */}
      {brand && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E4E4E7] shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-3 shrink-0 shadow-inner">
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=EDE9FE&color=4B1FD6&bold=true`;
              }}
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill bg-[#EDE9FE] text-[#4B1FD6] text-xs font-bold mb-1.5">
              <span>✦</span> Verified Direct Store
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              {brand.name}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">{brand.tagline}</p>
          </div>
          <div className="sm:text-right shrink-0">
            <span className="text-xs font-semibold text-zinc-400 block">Available Devices</span>
            <span className="text-2xl font-extrabold text-[#4B1FD6]">
              {products?.length || brand.productCount || 0}
            </span>
          </div>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <ProductCardSkeleton key={n} />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center my-8">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-red-900 mb-1">Failed to load brand products</h2>
          <p className="text-sm text-red-600 mb-4">{error?.message || 'Error fetching products for this brand'}</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-pill"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && products && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && (!products || products.length === 0) && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E4E4E7] shadow-sm my-8">
          <p className="text-zinc-500 text-base">No products currently listed for this brand.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block px-5 py-2.5 bg-[#4B1FD6] text-white text-sm font-semibold rounded-pill"
          >
            Explore Other Brands
          </Link>
        </div>
      )}

      <BottomNav />
    </main>
  );
}
