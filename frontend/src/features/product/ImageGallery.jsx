import React, { useState, useEffect } from 'react';

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

export default function ImageGallery({ mainImage, images = [], productName, brand }) {
  const allImages = React.useMemo(() => {
    const list = [mainImage, ...(images || [])].filter(Boolean);
    return Array.from(new Set(list));
  }, [mainImage, images]);

  const [selectedImage, setSelectedImage] = useState(mainImage);

  useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage]);

  const brandKey = (typeof brand === 'object' ? brand?.name : brand) || 
    (productName ? Object.keys(BRAND_COLORS).find(b => productName.toLowerCase().startsWith(b.toLowerCase())) : null);
  const colors = BRAND_COLORS[brandKey] || { bg: '5b21b6', fg: 'ffffff' };
  const fallbackUrl = `https://placehold.co/600x600/${colors.bg}/${colors.fg}?text=${encodeURIComponent((productName || 'Phone').split(' ').slice(0, 3).join('+'))}`;

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="w-full min-h-80 aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-8 border border-gray-100">
        <img
          src={selectedImage || mainImage}
          alt={productName}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackUrl;
          }}
        />
      </div>

      {/* Thumbnails strip */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1" role="tablist" aria-label="Product image thumbnails">
          {allImages.map((img, idx) => {
            const isSelected = selectedImage === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                aria-label={`View image ${idx + 1}`}
                aria-selected={isSelected}
                role="tab"
                className={`w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0 p-1 flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'border-2 border-brand'
                    : 'border border-gray-200 hover:border-gray-400'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackUrl;
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Clean rating line below thumbnails */}
      <p className="text-xs text-gray-400">
        4.2 ★ · 127 reviews
      </p>
    </div>
  );
}
