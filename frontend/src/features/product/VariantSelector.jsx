import React from 'react';

export default function VariantSelector({
  variants = [],
  selectedVariant,
  onSelectVariant,
}) {
  if (!variants || variants.length === 0) return null;

  // Extract unique storage options preserving order
  const storages = Array.from(
    new Set(variants.map((v) => v.storage).filter(Boolean))
  );

  // Extract unique color options (mapping name to colorHex)
  const colors = Array.from(
    new Map(
      variants
        .filter((v) => v.color)
        .map((v) => [v.color, { name: v.color, hex: v.colorHex || '#999999' }])
    ).values()
  );

  const handleColorChange = (colorName) => {
    const match =
      variants.find(
        (v) => v.color === colorName && v.storage === selectedVariant.storage
      ) || variants.find((v) => v.color === colorName) || variants[0];
    if (match) onSelectVariant(match.id);
  };

  const handleStorageChange = (storageSize) => {
    const match =
      variants.find(
        (v) => v.storage === storageSize && v.color === selectedVariant.color
      ) || variants.find((v) => v.storage === storageSize) || variants[0];
    if (match) onSelectVariant(match.id);
  };

  return (
    <div className="space-y-5">
      {/* Color selector */}
      {colors.length > 0 && (
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-2.5">
            Color
          </div>
          <div className="flex items-center gap-3">
            {colors.map((c) => {
              const isActive = selectedVariant.color === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleColorChange(c.name)}
                  title={c.name}
                  className={`relative w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                    isActive
                      ? 'ring-2 ring-brand ring-offset-2'
                      : 'hover:opacity-80'
                  }`}
                  aria-label={`Select color ${c.name}`}
                  aria-pressed={isActive}
                >
                  <span
                    className="w-full h-full rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Storage selector */}
      {storages.length > 0 && (
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-2.5">
            Storage
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {storages.map((storage) => {
              const isActive = selectedVariant.storage === storage;
              return (
                <button
                  key={storage}
                  type="button"
                  onClick={() => handleStorageChange(storage)}
                  className={`px-4 py-2 rounded-pill text-xs transition-colors ${
                    isActive
                      ? 'bg-brand text-white font-medium'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 font-normal'
                  }`}
                  aria-pressed={isActive}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
