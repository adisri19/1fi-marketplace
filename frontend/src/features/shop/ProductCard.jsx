import React from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/formatCurrency';
import Badge from '../../components/ui/Badge';

export default function ProductCard({ product }) {
  // Find minimum price among variants and first variant
  const variants = product.variants || [];
  const primaryVariant = variants[0] || {};
  const minPrice = variants.reduce(
    (min, v) => (v.price < min ? v.price : min),
    primaryVariant.price || 0
  );
  const totalSold = variants.reduce(
    (sum, v) => sum + (v.soldCount || 0),
    0
  );

  return (
    <div className="group bg-white rounded-card border border-[#E4E4E7] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(75,31,214,0.12)] hover:scale-[1.01] transition-all duration-150 flex flex-col justify-between overflow-hidden">
      <div className="p-4 flex flex-col flex-1">
        {/* Top: Product image with badge */}
        <div className="relative w-full h-[180px] bg-zinc-50 rounded-xl overflow-hidden flex items-center justify-center p-3 mb-3">
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <Badge variant={product.badge.toLowerCase() === 'new' ? 'new' : 'hot'}>
                {product.badge}
              </Badge>
            </div>
          )}
          <img
            src={primaryVariant.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>

        {/* Brand & Sold */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs text-[#71717A] uppercase font-semibold tracking-wider">
            {product.brand}
          </span>
          {totalSold > 0 && (
            <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-pill bg-orange-50 text-[#EA580C] border border-orange-100">
              {totalSold}+ sold 🔥
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-[15px] text-[#18181B] leading-snug line-clamp-2 mb-2 group-hover:text-[#4B1FD6] transition-colors">
          {product.name}
        </h3>

        {/* Starting Price */}
        <div className="mt-auto pt-2">
          <div className="text-sm font-semibold text-[#4B1FD6]">
            from {formatINR(minPrice)}
          </div>
          <div className="text-[13px] text-[#16A34A] font-medium mt-0.5">
            No-cost EMIs upto 12 months
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-4 pt-0">
        <Link
          to={`/products/${product.slug}`}
          className="flex items-center justify-center w-full h-10 bg-[#4B1FD6] hover:bg-[#3B0764] text-white font-semibold text-sm rounded-pill shadow-sm transition-colors active:scale-[0.98]"
        >
          View Plans
        </Link>
      </div>
    </div>
  );
}
