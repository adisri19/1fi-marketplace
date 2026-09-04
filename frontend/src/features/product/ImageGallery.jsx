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
  // Combine main image and gallery images into a unique list
  const allImages = React.useMemo(() => {
    const list = [mainImage, ...(images || [])].filter(Boolean);
    return Array.from(new Set(list));
  }, [mainImage, images]);

  const [selectedImage, setSelectedImage] = useState(mainImage);

  // When variant changes, reset the selected image to the new variant's main image
  useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage]);

  const brandKey = (typeof brand === 'object' ? brand?.name : brand) || 
    (productName ? Object.keys(BRAND_COLORS).find(b => productName.toLowerCase().startsWith(b.toLowerCase())) : null);
  const colors = BRAND_COLORS[brandKey] || { bg: '6b21a8', fg: 'ffffff' };
  const fallbackUrl = `https://placehold.co/600x600/${colors.bg}/${colors.fg}?text=${encodeURIComponent((productName || 'Phone').split(' ').slice(0, 3).join('+'))}`;

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square w-full bg-zinc-50 rounded-2xl border border-[#E4E4E7] overflow-hidden flex items-center justify-center p-6 shadow-sm">
        <img
          src={selectedImage || mainImage}
          alt={productName}
          className="w-full h-full object-contain transition-all duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackUrl;
          }}
        />

        {/* Rating Badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-zinc-200 px-2.5 py-1 rounded-pill shadow-md flex items-center gap-1.5 text-xs font-bold text-zinc-900">
          <span>4.2</span>
          <span className="text-amber-500 text-sm leading-none">★</span>
        </div>
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
                className={`w-[60px] h-[60px] rounded-xl overflow-hidden bg-zinc-50 border-2 shrink-0 p-1 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-[#4B1FD6] ring-2 ring-[#EDE9FE]'
                    : 'border-[#E4E4E7] hover:border-zinc-400 opacity-80 hover:opacity-100'
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
    </div>
  );
}
