export const BRAND_COLORS = {
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

export function getBrandPlaceholderUrl(brand, name = 'Phone') {
  const brandKey = typeof brand === 'object' ? brand?.name : brand;
  const colors = BRAND_COLORS[brandKey] || { bg: '6b21a8', fg: 'ffffff' };
  const shortText = name ? name.split(' ').slice(0, 3).join('+') : 'Phone';
  return `https://placehold.co/600x600/${colors.bg}/${colors.fg}?text=${encodeURIComponent(shortText)}`;
}
