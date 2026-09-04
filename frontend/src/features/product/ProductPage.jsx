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
import Toast from '../../components/ui/Toast';
import { ArrowLeft, ChevronDown, RefreshCw } from 'lucide-react';

const PRODUCT_SPECS = {
  'iphone-17-pro': {
    Display: '6.3" Super Retina XDR OLED, 120Hz ProMotion',
    Processor: 'Apple A19 Pro chip (3nm)',
    Camera: '48MP Fusion + 48MP Ultra Wide + 48MP 5x Telephoto',
    Battery: '4,685 mAh with MagSafe Fast Wireless Charging',
    OS: 'iOS 19 with Apple Intelligence',
  },
  'iphone-16-pro': {
    Display: '6.3" Super Retina XDR OLED, 120Hz ProMotion',
    Processor: 'Apple A18 Pro chip',
    Camera: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto',
    Battery: '3,582 mAh with USB-C 3.0',
    OS: 'iOS 18 with Apple Intelligence',
  },
  'iphone-16': {
    Display: '6.1" Super Retina XDR OLED',
    Processor: 'Apple A18 chip',
    Camera: '48MP Fusion + 12MP Ultra Wide with Macro',
    Battery: '3,561 mAh all-day battery',
    OS: 'iOS 18',
  },
  'samsung-galaxy-s25-ultra': {
    Display: '6.9" Dynamic AMOLED 2X, 120Hz LTPO',
    Processor: 'Snapdragon 8 Elite for Galaxy',
    Camera: '200MP Main + 50MP Periscope + 50MP UW + 10MP Tele',
    Battery: '5,000 mAh with 45W Fast Charging',
    OS: 'Android 15, One UI 7 with Galaxy AI',
  },
  'samsung-s25-ultra': {
    Display: '6.9" Dynamic AMOLED 2X, 120Hz LTPO',
    Processor: 'Snapdragon 8 Elite for Galaxy',
    Camera: '200MP Main + 50MP Periscope + 50MP UW + 10MP Tele',
    Battery: '5,000 mAh with 45W Fast Charging',
    OS: 'Android 15, One UI 7 with Galaxy AI',
  },
  'oneplus-13': {
    Display: '6.82" 2K 120Hz ProXDR LTPO AMOLED',
    Processor: 'Snapdragon 8 Elite (3nm)',
    Camera: '50MP Sony LYT-808 + 50MP Periscope + 50MP UW',
    Battery: '6,000 mAh with 100W SUPERVOOC',
    OS: 'OxygenOS 15 based on Android 15',
  },
  'google-pixel-9-pro': {
    Display: '6.3" Super Actua OLED (1-120Hz)',
    Processor: 'Google Tensor G4 with Titan M2',
    Camera: '50MP Octa PD + 48MP Quad PD Telephoto',
    Battery: '4,700 mAh with 27W fast charging',
    OS: 'Android 15 with 7 years of OS updates',
  },
  'xiaomi-15-pro': {
    Display: '6.73" 2K OLED 120Hz LTPO',
    Processor: 'Snapdragon 8 Elite',
    Camera: '50MP Leica Triple Camera with OIS',
    Battery: '6,100 mAh with 90W HyperCharge',
    OS: 'Xiaomi HyperOS 2',
  },
};

function getSpecsForProduct(prod) {
  if (!prod) return {};
  if (PRODUCT_SPECS[prod.slug]) return PRODUCT_SPECS[prod.slug];

  const brand = typeof prod.brand === 'object' ? prod.brand?.name : prod.brand;
  const name = prod.name || '';

  if (brand === 'Apple' || name.toLowerCase().includes('iphone')) {
    return {
      Display: 'Super Retina XDR OLED Display',
      Processor: 'Apple Bionic / Pro Silicon chip',
      Camera: 'Advanced Dual/Triple Camera with Photonic Engine',
      Battery: 'All-day battery life with fast charging',
      OS: 'iOS 18 / 19',
    };
  } else if (brand === 'Samsung' || name.toLowerCase().includes('galaxy')) {
    return {
      Display: 'Dynamic AMOLED 2X, 120Hz HDR10+',
      Processor: 'Snapdragon / Exynos Octa-Core Processor',
      Camera: 'Multi-Lens Pro-grade Camera with OIS',
      Battery: '5,000 mAh with Super Fast Charging',
      OS: 'Android 15, One UI with Galaxy AI',
    };
  } else if (brand === 'Google' || name.toLowerCase().includes('pixel')) {
    return {
      Display: 'Actua OLED Smooth Display with Gorilla Glass Victus',
      Processor: 'Google Tensor chip with Titan Security',
      Camera: 'Google Computational Photography with Magic Eraser',
      Battery: '4,800 mAh with Extreme Battery Saver',
      OS: 'Pure Android 15 with Pixel Drop features',
    };
  } else {
    return {
      Display: '6.7" AMOLED FHD+ 120Hz Display',
      Processor: 'Qualcomm Snapdragon / MediaTek Dimensity',
      Camera: '50MP Primary with OIS + Ultra Wide',
      Battery: '5,000 mAh with Rapid Turbo Charging',
      OS: 'Android 15 OS',
    };
  }
}

export default function ProductPage() {
  const { slug } = useParams();
  const { data: product, isLoading, isError, error, refetch } = useProduct(slug);

  const {
    selectedVariantId,
    selectedEMIPlanId,
    setVariant,
    setEMIPlan,
    resetProduct,
  } = useProductStore();

  const [toastInfo, setToastInfo] = useState({ isVisible: false, message: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset store selection when navigating to a new product
  useEffect(() => {
    resetProduct();
  }, [slug, resetProduct]);

  // Set default variant if not already selected
  useEffect(() => {
    if (product?.variants?.length > 0 && !selectedVariantId) {
      setVariant(product.variants[0].id);
    }
  }, [product, selectedVariantId, setVariant]);

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  // 404 state when product is not found
  const is404 = !product || error?.response?.status === 404;
  if (is404) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center max-w-md mx-auto px-5">
        <p className="text-4xl mb-4">📱</p>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
        <p className="text-gray-500 text-sm mb-6">
          This product may have been removed or the link is incorrect.
        </p>
        <Link
          to="/shop"
          className="bg-brand text-white px-6 py-3 rounded-btn text-sm font-medium hover:opacity-95 transition-opacity inline-flex items-center gap-2"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center max-w-md mx-auto px-5">
        <p className="text-4xl mb-4">⚠️</p>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load product</h2>
        <p className="text-gray-500 text-sm mb-6">
          {error?.message || 'Something went wrong while loading this product.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-btn hover:opacity-95 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
          <Link
            to="/shop"
            className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-btn hover:border-gray-400 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const variants = product.variants || [];
  const activeVariant =
    variants.find((v) => v.id === selectedVariantId) || variants[0] || {};
  const emiPlans = activeVariant.emiPlans || [];
  const activeEMIPlan = emiPlans.find((p) => p.id === selectedEMIPlanId);

  const brandName = typeof product.brand === 'object' ? product.brand?.name : product.brand;

  const discountAmount =
    activeVariant.mrp && activeVariant.mrp > activeVariant.price
      ? activeVariant.mrp - activeVariant.price
      : 0;

  const discountPercent =
    activeVariant.mrp && activeVariant.mrp > activeVariant.price
      ? Math.round((discountAmount / activeVariant.mrp) * 100)
      : null;

  const handleProceed = () => {
    if (!activeEMIPlan) return;
    const msg = `✓ Plan selected — ${formatINR(activeEMIPlan.monthlyAmount)}/mo × ${activeEMIPlan.tenureMonths} months`;
    setToastInfo({ isVisible: true, message: msg });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 2500);
  };

  const variantSummary = [activeVariant.storage, activeVariant.color]
    .filter(Boolean)
    .join(' · ');

  const productSpecs = getSpecsForProduct(product);

  return (
    <main className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16 py-8 pb-28 md:pb-16">
      {/* Back button breadcrumb */}
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* LEFT PANEL — Image Gallery */}
        <div className="md:col-span-5">
          <div className="sticky top-20">
            <ImageGallery
              mainImage={activeVariant.imageUrl}
              images={activeVariant.images}
              productName={product.name}
              brand={brandName}
            />
          </div>
        </div>

        {/* RIGHT PANEL — Product Details & EMI Selection */}
        <div className="md:col-span-7">
          {/* Header Info */}
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wide block">
              {brandName}
            </span>

            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              {product.name}
            </h1>

            {variantSummary && (
              <p className="text-sm text-gray-500 mt-1">
                {variantSummary}
              </p>
            )}
          </div>

          <div className="border-t border-gray-100 my-5" />

          {/* Pricing */}
          <div>
            <div className="flex items-baseline gap-3">
              {activeVariant.mrp && activeVariant.mrp > activeVariant.price && (
                <span className="text-base text-gray-300 line-through">
                  {formatINR(activeVariant.mrp)}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                {formatINR(activeVariant.price)}
              </span>
            </div>
            {discountAmount > 0 && (
              <p className="text-xs text-success mt-1 font-normal">
                Save {formatINR(discountAmount)} ({discountPercent}% off)
              </p>
            )}
          </div>

          <div className="border-t border-gray-100 my-5" />

          {/* Variant Selector */}
          <VariantSelector
            variants={variants}
            selectedVariant={activeVariant}
            onSelectVariant={(variantId) => setVariant(variantId)}
          />

          <div className="border-t border-gray-100 my-5" />

          {/* EMI Plans */}
          <EMIPlanList
            plans={emiPlans}
            selectedPlanId={selectedEMIPlanId}
            onSelectPlan={(planId) => setEMIPlan(planId)}
          />

          {/* Proceed CTA Button */}
          <ProceedButton
            selectedPlan={activeEMIPlan}
            onProceed={handleProceed}
            isSuccess={isSuccess}
          />

          {/* Collapsible Product Specifications */}
          {Object.keys(productSpecs).length > 0 && (
            <details className="mt-6 border-t border-gray-100 pt-4 group">
              <summary className="text-sm font-medium text-gray-600 cursor-pointer list-none flex items-center justify-between hover:text-gray-900 transition-colors">
                <span>Product Specifications</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-3 space-y-2">
                {Object.entries(productSpecs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-b-0">
                    <span className="text-gray-400">{key}</span>
                    <span className="text-gray-700 font-medium text-right max-w-xs">{val}</span>
                  </div>
                ))}
              </div>
            </details>
          )}
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
