import React from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/formatCurrency';

const BRAND_COLORS = {
  Apple:    { bg: '1d1d1f', fg: 'ffffff' },
  Samsung:  { bg: '1428a0', fg: 'ffffff' },
  OnePlus:  { bg: 'eb0029', fg: 'ffffff' },
  Google:   { bg: '4285f4', fg: 'ffffff' },
  Xiaomi:   { bg: 'ff6900', fg: 'ffffff' },
  vivo:     { bg: '415fff', fg: 'ffffff' },
  iQOO:     { bg: '000000', fg: 'ffffff' },
  OPPO:     { bg: '1d4ed8', fg: 'ffffff' },
  Realme:   { bg: 'ffd700', fg: '000000' },
  Motorola: { bg: '5c2d91', fg: 'ffffff' },
  Nothing:  { bg: '000000', fg: 'ffffff' },
  ASUS:     { bg: '00539c', fg: 'ffffff' },
};

export default function ProductCard({ product }) {
  const variants = product.variants || [];
  const primaryVariant = variants[0] || {};
  const minPrice = variants.reduce(
    (min, v) => (v.price < min ? v.price : min),
    primaryVariant.price || 0
  );

  const brandName = typeof product.brand === 'object' ? product.brand?.name : product.brand;

  // Extract unique colors for the variant indicator
  const uniqueColors = Array.from(
    new Map(
      variants
        .filter((v) => v.color)
        .map((v) => [v.color, v.colorHex || '#A1A1AA'])
    ).entries()
  );

  return (
    <div className="relative bg-white rounded-card border border-gray-200 shadow-card hover:scale-[1.005] transition-transform duration-150 flex flex-col justify-between overflow-hidden">
      {/* Subtle badge dot if product.badge exists */}
      {product.badge && (
        <div
          title={product.badge}
          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand z-10"
        />
      )}

      {/* Top Image Area */}
      <div className="bg-gray-50 p-6 h-44 flex items-center justify-center border-b border-gray-200">
        <img
          src={primaryVariant.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            const colors = BRAND_COLORS[brandName] || { bg: '5b21b6', fg: 'ffffff' };
            e.target.src = `https://placehold.co/600x600/${colors.bg}/${colors.fg}?text=${encodeURIComponent((product.name || 'Phone').split(' ').slice(0, 3).join('+'))}`;
          }}
        />
      </div>

      {/* Bottom Info Area */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-gray-600">
              from {formatINR(minPrice)}
            </p>

            {/* Variant indicator */}
            {uniqueColors.length > 0 && (
              <div className="flex items-center gap-1" title={`${uniqueColors.length} colors available`}>
                <div className="flex items-center -space-x-1">
                  {uniqueColors.slice(0, 3).map(([colorName, colorHex], i) => (
                    <span
                      key={i}
                      className="w-2.5 h-2.5 rounded-full border border-white shadow-2xs"
                      style={{ backgroundColor: colorHex }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 ml-1">
                  {uniqueColors.length} {uniqueColors.length === 1 ? 'color' : 'colors'}
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-1">
            0% EMI · upto 12 months
          </p>
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="mt-4 w-full bg-brand hover:opacity-95 text-white font-medium text-sm rounded-btn h-10 flex items-center justify-center transition-opacity"
        >
          View Plans
        </Link>
      </div>
    </div>
  );
}
