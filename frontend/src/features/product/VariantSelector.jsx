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
    // Try to find variant with chosen color and currently selected storage
    const match =
      variants.find(
        (v) => v.color === colorName && v.storage === selectedVariant.storage
      ) || variants.find((v) => v.color === colorName) || variants[0];
    if (match) onSelectVariant(match.id);
  };

  const handleStorageChange = (storageSize) => {
    // Try to find variant with chosen storage and currently selected color
    const match =
      variants.find(
        (v) => v.storage === storageSize && v.color === selectedVariant.color
      ) || variants.find((v) => v.storage === storageSize) || variants[0];
    if (match) onSelectVariant(match.id);
  };

  return (
    <div className="space-y-5 py-2">
      {/* Color selector */}
      {colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Color: <span className="text-zinc-900 font-bold normal-case">{selectedVariant.color}</span>
            </span>
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
                  className={`relative w-8 h-8 rounded-full transition-transform active:scale-95 flex items-center justify-center ${
                    isActive
                      ? 'ring-2 ring-[#4B1FD6] ring-offset-2 scale-110'
                      : 'hover:scale-105 opacity-90 hover:opacity-100'
                  }`}
                  aria-label={`Select color ${c.name}`}
                  aria-pressed={isActive}
                >
                  <span
                    className="w-full h-full rounded-full border border-black/10 shadow-inner"
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
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Storage: <span className="text-zinc-900 font-bold normal-case">{selectedVariant.storage}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {storages.map((storage) => {
              const isActive = selectedVariant.storage === storage;
              return (
                <button
                  key={storage}
                  type="button"
                  onClick={() => handleStorageChange(storage)}
                  className={`px-4 py-2 rounded-pill text-xs font-bold transition-all shadow-sm ${
                    isActive
                      ? 'bg-[#4B1FD6] text-white shadow-[#4B1FD6]/20'
                      : 'bg-white text-zinc-700 border border-[#E4E4E7] hover:border-zinc-400'
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
