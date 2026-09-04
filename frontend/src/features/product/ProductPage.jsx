import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { useProductStore } from '../../store/productStore';
import { formatINR } from '../../utils/formatCurrency';
import ImageGallery from './ImageGallery';
import VariantSelector from './VariantSelector';
import EMIPlanList from './EMIPlanList';
import ProceedButton from './ProceedButton';
import { ProductPageSkeleton } from '../../components/ui/Skeleton';
import Badge from '../../components/ui/Badge';
import Toast from '../../components/ui/Toast';
import { ArrowLeft, Zap, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export default function ProductPage() {
  const { slug } = useParams();
  const { data: product, isLoading, isError, error, refetch } = useProduct(slug);

  const {
    selectedVariantId,
    selectedEMIPlanId,
    setVariant,
    setEMIPlan,
    reset,
  } = useProductStore();

  const [toastInfo, setToastInfo] = useState({ isVisible: false, message: '' });

  // Reset store selection when navigating to a new product
  useEffect(() => {
    reset();
  }, [slug, reset]);

  // Set default variant if not already selected
  useEffect(() => {
    if (product?.variants?.length > 0 && !selectedVariantId) {
      setVariant(product.variants[0].id);
    }
  }, [product, selectedVariantId, setVariant]);

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl p-8 border border-red-200 shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-zinc-900 mb-1">Product Not Found</h2>
          <p className="text-sm text-zinc-500 mb-6">
            {error?.message || `Unable to load details for "${slug}".`}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4B1FD6] text-white text-sm font-semibold rounded-pill hover:bg-[#3B0764] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
            <Link
              to="/shop"
              className="px-5 py-2.5 border border-zinc-300 text-zinc-700 text-sm font-semibold rounded-pill hover:bg-zinc-50 transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const variants = product.variants || [];
  const activeVariant =
    variants.find((v) => v.id === selectedVariantId) || variants[0] || {};
  const emiPlans = activeVariant.emiPlans || [];
  const activeEMIPlan = emiPlans.find((p) => p.id === selectedEMIPlanId);

  // Calculate discount percentage if MRP > price
  const discountPercent =
    activeVariant.mrp && activeVariant.mrp > activeVariant.price
      ? Math.round(
          ((activeVariant.mrp - activeVariant.price) / activeVariant.mrp) * 100
        )
      : null;

  // Lowest monthly amount for Snapmint style info box
  const lowestMonthlyAmount =
    emiPlans.length > 0
      ? Math.min(...emiPlans.map((p) => p.monthlyAmount))
      : null;

  const handleProceed = () => {
    if (!activeEMIPlan) return;
    const msg = `✓ Plan selected — ${formatINR(activeEMIPlan.monthlyAmount)}/mo × ${activeEMIPlan.tenureMonths} months`;
    setToastInfo({ isVisible: true, message: msg });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 md:py-10 pb-28 md:pb-16">
      {/* Back button breadcrumb */}
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-[#4B1FD6] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      {/* Two-column layout: 40% left / 60% right on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* LEFT PANEL — ImageGallery */}
        <div className="md:col-span-5">
          <div className="sticky top-24">
            <ImageGallery
              mainImage={activeVariant.imageUrl}
              images={activeVariant.images}
              productName={product.name}
              brand={product.brand?.name || product.brand}
            />

            {/* Value Props under Image Gallery */}
            <div className="hidden md:grid grid-cols-2 gap-3 mt-6">
              <div className="bg-white p-3 rounded-xl border border-[#E4E4E7] flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#4B1FD6] shrink-0" />
                <span className="text-xs text-zinc-600 font-medium">100% Original Apple/OEM</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E4E4E7] flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-[#EA580C] shrink-0" />
                <span className="text-xs text-zinc-600 font-medium">Instant Loan Approval</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Product Details & EMI Selection */}
        <div className="md:col-span-7 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                {product.brand?.name || product.brand}
              </span>
              {product.badge && (
                <Badge variant={product.badge.toLowerCase() === 'new' ? 'new' : 'hot'}>
                  {product.badge}
                </Badge>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-sm text-zinc-500 font-medium">
                (Storage: {activeVariant.storage || 'Standard'}, Color: {activeVariant.color || 'Standard'})
              </span>
              {activeVariant.soldCount > 0 && (
                <span className="inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-pill bg-orange-50 text-[#EA580C] border border-orange-200">
                  🔥 {activeVariant.soldCount}+ sold
                </span>
              )}
            </div>
          </div>

          <hr className="border-zinc-200" />

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 flex-wrap">
            {activeVariant.mrp && activeVariant.mrp > activeVariant.price && (
              <span className="text-base text-zinc-400 line-through">
                {formatINR(activeVariant.mrp)}
              </span>
            )}
            <span className="text-3xl font-extrabold text-zinc-900 tracking-tight">
              {formatINR(activeVariant.price)}
            </span>
            {discountPercent && (
              <span className="inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-pill bg-emerald-100 text-emerald-800">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <hr className="border-zinc-200" />

          {/* Variant Selector (Colors & Storage) */}
          <VariantSelector
            variants={variants}
            selectedVariant={activeVariant}
            onSelectVariant={(variantId) => setVariant(variantId)}
          />

          <hr className="border-zinc-200" />

          {/* Snapmint style orange info box */}
          {lowestMonthlyAmount && (
            <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  ₹
                </div>
                <div>
                  <div className="text-xs text-[#C2410C] font-semibold">Special Mutual Fund Benefit</div>
                  <div className="text-sm font-bold text-[#9A3412]">
                    Pay only {formatINR(lowestMonthlyAmount)} now
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-pill text-[#EA580C] border border-[#FED7AA] shadow-xs">
                0% Interest
              </span>
            </div>
          )}

          {/* EMI Tenure Radio-Card List */}
          <EMIPlanList
            plans={emiPlans}
            selectedPlanId={selectedEMIPlanId}
            onSelectPlan={(planId) => setEMIPlan(planId)}
          />

          {/* Proceed CTA Button */}
          <ProceedButton
            selectedPlan={activeEMIPlan}
            onProceed={handleProceed}
          />
        </div>
      </div>

      {/* Floating Success Toast */}
      <Toast
        message={toastInfo.message}
        isVisible={toastInfo.isVisible}
        onClose={() => setToastInfo({ isVisible: false, message: '' })}
      />
    </main>
  );
}
