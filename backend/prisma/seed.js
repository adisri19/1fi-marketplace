const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper to generate realistic EMI plans for a price
function generateEMIPlans(price) {
  const tenures = [3, 6, 9, 12, 24, 36, 48, 60];
  return tenures.map((tenure) => {
    const isZeroPercent = tenure <= 24;
    const interestRate = isZeroPercent ? 0 : 10.5;
    let monthlyAmount;
    if (isZeroPercent) {
      monthlyAmount = Math.round(price / tenure);
    } else {
      // Approximate EMI calculation with 10.5% annual rate
      const r = 10.5 / 12 / 100;
      monthlyAmount = Math.round((price * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1));
    }
    const cashback = price >= 100000 ? 7500 : price >= 50000 ? 5000 : 3000;
    return {
      tenureMonths: tenure,
      monthlyAmount,
      interestRate,
      cashback,
      isPopular: tenure === 12,
    };
  });
}

// Brand metadata definition
const BRANDS_DATA = [
  { name: 'Apple', logoUrl: 'https://logo.clearbit.com/apple.com', tagline: 'No-cost EMIs upto 24 months' },
  { name: 'Samsung', logoUrl: 'https://logo.clearbit.com/samsung.com', tagline: 'No-cost EMIs upto 24 months' },
  { name: 'OnePlus', logoUrl: 'https://logo.clearbit.com/oneplus.com', tagline: 'Zero downpayment on all models' },
  { name: 'Google', logoUrl: 'https://logo.clearbit.com/google.com', tagline: 'Pure Android with 0% interest' },
  { name: 'Xiaomi', logoUrl: 'https://logo.clearbit.com/xiaomi.com', tagline: 'Affordable EMIs from ₹999/month' },
  { name: 'vivo', logoUrl: 'https://logo.clearbit.com/vivo.com', tagline: 'Camera flagship EMIs available' },
  { name: 'iQOO', logoUrl: 'https://logo.clearbit.com/iqoo.com', tagline: 'Performance gaming phones on EMI' },
  { name: 'OPPO', logoUrl: 'https://logo.clearbit.com/oppo.com', tagline: 'Portrait experts on easy EMIs' },
  { name: 'Realme', logoUrl: 'https://logo.clearbit.com/realme.com', tagline: 'Next-gen tech with zero interest' },
  { name: 'Motorola', logoUrl: 'https://logo.clearbit.com/motorola.com', tagline: 'Clean Edge & Razr series on EMI' },
  { name: 'Nothing', logoUrl: 'https://logo.clearbit.com/nothing.tech', tagline: 'Glyph design smartphones on EMI' },
  { name: 'ASUS', logoUrl: 'https://logo.clearbit.com/asus.com', tagline: 'Ultimate ROG gaming phones on EMI' },
];


const IMAGES = {
  // ── APPLE (8) ──────────────────────────────────────────────────────
  'iphone-17-pro': '/images/products/iphone-17-pro.webp',
  'iphone-17-pro-max': '/images/products/iphone-17-pro-max.webp',
  'iphone-17': '/images/products/iphone-17.webp',
  'iphone-16': '/images/products/iphone-16.webp',
  'iphone-16-plus': '/images/products/iphone-16-plus.webp',
  'iphone-15': '/images/products/iphone-15.webp',
  'iphone-se-4': '/images/products/iphone-se-4.webp',
  'ipad-air-m3': '/images/products/ipad-air-m3.webp',

  // ── SAMSUNG (10) ───────────────────────────────────────────────────
  'samsung-s25-ultra': '/images/products/samsung-s25-ultra.webp',
  'samsung-s25-plus': '/images/products/samsung-s25-plus.webp',
  'samsung-s25': '/images/products/samsung-s25.webp',
  'samsung-z-fold-7': '/images/products/samsung-z-fold-7.jpg',
  'samsung-z-flip-7': '/images/products/samsung-z-flip-7.jpg',
  'samsung-a56': '/images/products/samsung-a56.webp',
  'samsung-a36': '/images/products/samsung-a36.webp',
  'samsung-m55': '/images/products/samsung-m55.webp',
  'samsung-s24-fe': '/images/products/samsung-s24-fe.webp',
  'samsung-tab-s10': '/images/products/samsung-tab-s10.webp',

  // ── ONEPLUS (6) ───────────────────────────────────────────────────
  'oneplus-13': '/images/products/oneplus-13.jpg',
  'oneplus-13r': '/images/products/oneplus-13r.jpg',
  'oneplus-nord-4': '/images/products/oneplus-nord-4.webp',
  'oneplus-open-2': '/images/products/oneplus-open-2.jpg',
  'oneplus-12': '/images/products/oneplus-12.webp',
  'oneplus-nord-ce-4': '/images/products/oneplus-nord-ce-4.webp',

  // ── GOOGLE PIXEL (5) ──────────────────────────────────────────────
  'pixel-9-pro-xl': '/images/products/pixel-9-pro-xl.png',
  'pixel-9-pro': '/images/products/pixel-9-pro.png',
  'pixel-9': '/images/products/pixel-9.png',
  'pixel-9-pro-fold': '/images/products/pixel-9-pro-fold.png',
  'pixel-8a': '/images/products/pixel-8a.png',

  // ── XIAOMI / REDMI / POCO (6) ─────────────────────────────────────
  'xiaomi-15-ultra': '/images/products/xiaomi-15-ultra.jpg',
  'xiaomi-14': '/images/products/xiaomi-14.jpg',
  'redmi-note-14-pro': '/images/products/redmi-note-14-pro.jpg',
  'redmi-note-14': '/images/products/redmi-note-14.jpg',
  'poco-x7-pro': '/images/products/poco-x7-pro.webp',
  'poco-f7-pro': '/images/products/poco-f7-pro.webp',

  // ── VIVO / IQOO (5) ───────────────────────────────────────────────
  'vivo-x200-pro': '/images/products/vivo-x200-pro.webp',
  'vivo-v50': '/images/products/vivo-v50.webp',
  'vivo-y300-plus': '/images/products/vivo-y300-plus.webp',
  'iqoo-13': '/images/products/iqoo-13.webp',
  'iqoo-neo-10': '/images/products/iqoo-neo-10.webp',

  // ── OPPO / REALME (5) ─────────────────────────────────────────────
  'oppo-find-x8-pro': '/images/products/oppo-find-x8-pro.webp',
  'oppo-reno-13-pro': '/images/products/oppo-reno-13-pro.webp',
  'oppo-a3-pro': '/images/products/oppo-a3-pro.webp',
  'realme-gt-7-pro': '/images/products/realme-gt-7-pro.webp',
  'realme-14x': '/images/products/realme-14x.webp',

  // ── MOTOROLA / NOTHING / ASUS (5) ─────────────────────────────────
  'motorola-edge-50-ultra': '/images/products/motorola-edge-50-ultra.webp',
  'motorola-razr-50': '/images/products/motorola-razr-50.jpg',
  'nothing-phone-3': '/images/products/nothing-phone-3.png',
  'nothing-phone-2a-plus': '/images/products/nothing-phone-2a-plus.jpg',
  'asus-rog-phone-9': '/images/products/asus-rog-phone-9.png',
};

// Helper to get verified local product image:
const img = (slug) => IMAGES[slug] || `/images/products/${slug}.webp`;

// Verified real phone image sources
const PHONE_SPECS = [
  // ─── APPLE (8 products) ──────────────────────────────────────────
  {
    brand: 'Apple',
    name: 'Apple iPhone 17 Pro',
    slug: 'iphone-17-pro',
    badge: 'NEW',
    price: 127400,
    mrp: 134900,
    soldCount: 142,
    storage: '256GB',
    color: 'Natural Titanium',
    colorHex: '#E8D5B7',
  },
  {
    brand: 'Apple',
    name: 'Apple iPhone 17 Pro Max',
    slug: 'iphone-17-pro-max',
    badge: 'HOT',
    price: 144900,
    mrp: 154900,
    soldCount: 188,
    storage: '512GB',
    color: 'Desert Titanium',
    colorHex: '#C4A882',
  },
  {
    brand: 'Apple',
    name: 'Apple iPhone 17',
    slug: 'iphone-17',
    badge: null,
    price: 89900,
    mrp: 94900,
    soldCount: 95,
    storage: '256GB',
    color: 'Ultramarine Blue',
    colorHex: '#38527C',
  },
  {
    brand: 'Apple',
    name: 'Apple iPhone 16',
    slug: 'iphone-16',
    badge: null,
    price: 79900,
    mrp: 84900,
    soldCount: 240,
    storage: '128GB',
    color: 'Teal Green',
    colorHex: '#4E7F78',
  },
  {
    brand: 'Apple',
    name: 'Apple iPhone 16 Plus',
    slug: 'iphone-16-plus',
    badge: null,
    price: 89900,
    mrp: 94900,
    soldCount: 78,
    storage: '256GB',
    color: 'Pink Blush',
    colorHex: '#E9A6B2',
  },
  {
    brand: 'Apple',
    name: 'Apple iPhone 15',
    slug: 'iphone-15',
    badge: null,
    price: 69900,
    mrp: 79900,
    soldCount: 310,
    storage: '128GB',
    color: 'Midnight Black',
    colorHex: '#1F2022',
  },
  {
    brand: 'Apple',
    name: 'Apple iPhone SE (4th Gen)',
    slug: 'iphone-se-4',
    badge: 'NEW',
    price: 49900,
    mrp: 54900,
    soldCount: 65,
    storage: '128GB',
    color: 'Starlight White',
    colorHex: '#F0ECE4',
  },
  {
    brand: 'Apple',
    name: 'Apple iPad Air M3',
    slug: 'ipad-air-m3',
    badge: null,
    price: 74900,
    mrp: 79900,
    soldCount: 52,
    storage: '256GB',
    color: 'Space Gray',
    colorHex: '#525458',
  },

  // ─── SAMSUNG (10 products) ───────────────────────────────────────
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy S25 Ultra',
    slug: 'samsung-s25-ultra',
    badge: 'HOT',
    price: 119999,
    mrp: 129999,
    soldCount: 165,
    storage: '256GB',
    color: 'Titanium Black',
    colorHex: '#1C1C1E',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy S25+',
    slug: 'samsung-s25-plus',
    badge: null,
    price: 99999,
    mrp: 109999,
    soldCount: 88,
    storage: '256GB',
    color: 'Cobalt Violet',
    colorHex: '#4C4066',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy S25',
    slug: 'samsung-s25',
    badge: null,
    price: 79999,
    mrp: 84999,
    soldCount: 112,
    storage: '128GB',
    color: 'Silver Shadow',
    colorHex: '#D1D2D6',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy Z Fold 7',
    slug: 'samsung-z-fold-7',
    badge: 'NEW',
    price: 159999,
    mrp: 169999,
    soldCount: 45,
    storage: '512GB',
    color: 'Crafted Black',
    colorHex: '#222224',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy Z Flip 7',
    slug: 'samsung-z-flip-7',
    badge: null,
    price: 89999,
    mrp: 99999,
    soldCount: 74,
    storage: '256GB',
    color: 'Mint Green',
    colorHex: '#BCE3D1',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy A56',
    slug: 'samsung-a56',
    badge: null,
    price: 34999,
    mrp: 38999,
    soldCount: 195,
    storage: '128GB',
    color: 'Awesome Navy',
    colorHex: '#1B2C42',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy A36',
    slug: 'samsung-a36',
    badge: null,
    price: 24999,
    mrp: 27999,
    soldCount: 220,
    storage: '128GB',
    color: 'Awesome Iceblue',
    colorHex: '#C5D8E8',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy M55',
    slug: 'samsung-m55',
    badge: null,
    price: 29999,
    mrp: 32999,
    soldCount: 140,
    storage: '128GB',
    color: 'Denim Black',
    colorHex: '#2C343D',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy S24 FE',
    slug: 'samsung-s24-fe',
    badge: null,
    price: 54999,
    mrp: 59999,
    soldCount: 130,
    storage: '256GB',
    color: 'Graphite',
    colorHex: '#3D3F42',
  },
  {
    brand: 'Samsung',
    name: 'Samsung Galaxy Tab S10',
    slug: 'samsung-tab-s10',
    badge: null,
    price: 84999,
    mrp: 89999,
    soldCount: 42,
    storage: '256GB',
    color: 'Moonstone Gray',
    colorHex: '#73757C',
  },

  // ─── ONEPLUS (6 products) ────────────────────────────────────────
  {
    brand: 'OnePlus',
    name: 'OnePlus 13',
    slug: 'oneplus-13',
    badge: 'HOT',
    price: 64999,
    mrp: 69999,
    soldCount: 215,
    storage: '256GB',
    color: 'Midnight Ocean',
    colorHex: '#1A3A5C',
  },
  {
    brand: 'OnePlus',
    name: 'OnePlus 13R',
    slug: 'oneplus-13r',
    badge: null,
    price: 42999,
    mrp: 46999,
    soldCount: 175,
    storage: '256GB',
    color: 'Astral Silver',
    colorHex: '#D5D7DF',
  },
  {
    brand: 'OnePlus',
    name: 'OnePlus Nord 4',
    slug: 'oneplus-nord-4',
    badge: null,
    price: 29999,
    mrp: 32999,
    soldCount: 260,
    storage: '128GB',
    color: 'Mercurial Silver',
    colorHex: '#B5BAC2',
  },
  {
    brand: 'OnePlus',
    name: 'OnePlus Open 2',
    slug: 'oneplus-open-2',
    badge: 'NEW',
    price: 149999,
    mrp: 159999,
    soldCount: 38,
    storage: '512GB',
    color: 'Emerald Dusk',
    colorHex: '#254E41',
  },
  {
    brand: 'OnePlus',
    name: 'OnePlus 12',
    slug: 'oneplus-12',
    badge: null,
    price: 54999,
    mrp: 64999,
    soldCount: 190,
    storage: '256GB',
    color: 'Flowy Emerald',
    colorHex: '#2B5549',
  },
  {
    brand: 'OnePlus',
    name: 'OnePlus Nord CE 4',
    slug: 'oneplus-nord-ce-4',
    badge: null,
    price: 24999,
    mrp: 26999,
    soldCount: 320,
    storage: '128GB',
    color: 'Celadon Marble',
    colorHex: '#A2C6B6',
  },

  // ─── GOOGLE (5 products) ─────────────────────────────────────────
  {
    brand: 'Google',
    name: 'Google Pixel 9 Pro XL',
    slug: 'pixel-9-pro-xl',
    badge: 'HOT',
    price: 109999,
    mrp: 119999,
    soldCount: 89,
    storage: '256GB',
    color: 'Obsidian Black',
    colorHex: '#222325',
  },
  {
    brand: 'Google',
    name: 'Google Pixel 9 Pro',
    slug: 'pixel-9-pro',
    badge: null,
    price: 99999,
    mrp: 106999,
    soldCount: 72,
    storage: '256GB',
    color: 'Hazel Porcelain',
    colorHex: '#7C827D',
  },
  {
    brand: 'Google',
    name: 'Google Pixel 9',
    slug: 'pixel-9',
    badge: null,
    price: 79999,
    mrp: 84999,
    soldCount: 110,
    storage: '128GB',
    color: 'Rose Quartz',
    colorHex: '#E2B8BC',
  },
  {
    brand: 'Google',
    name: 'Google Pixel 9 Pro Fold',
    slug: 'pixel-9-pro-fold',
    badge: 'NEW',
    price: 172999,
    mrp: 179999,
    soldCount: 29,
    storage: '256GB',
    color: 'Porcelain White',
    colorHex: '#EAE5DB',
  },
  {
    brand: 'Google',
    name: 'Google Pixel 8a',
    slug: 'pixel-8a',
    badge: null,
    price: 52999,
    mrp: 57999,
    soldCount: 160,
    storage: '128GB',
    color: 'Bay Blue',
    colorHex: '#80A8C9',
  },

  // ─── XIAOMI / REDMI / POCO (6 products) ──────────────────────────
  {
    brand: 'Xiaomi',
    name: 'Xiaomi 15 Ultra',
    slug: 'xiaomi-15-ultra',
    badge: 'NEW',
    price: 89999,
    mrp: 99999,
    soldCount: 68,
    storage: '512GB',
    color: 'Ceramic White',
    colorHex: '#F6F6F6',
  },
  {
    brand: 'Xiaomi',
    name: 'Xiaomi 14',
    slug: 'xiaomi-14',
    badge: null,
    price: 69999,
    mrp: 74999,
    soldCount: 125,
    storage: '256GB',
    color: 'Jade Green',
    colorHex: '#4C655A',
  },
  {
    brand: 'Xiaomi',
    name: 'Redmi Note 14 Pro+',
    slug: 'redmi-note-14-pro',
    badge: 'HOT',
    price: 29999,
    mrp: 33999,
    soldCount: 380,
    storage: '256GB',
    color: 'Mirror Porcelain',
    colorHex: '#D8D9DE',
  },
  {
    brand: 'Xiaomi',
    name: 'Redmi Note 14',
    slug: 'redmi-note-14',
    badge: null,
    price: 19999,
    mrp: 22999,
    soldCount: 450,
    storage: '128GB',
    color: 'Phantom Blue',
    colorHex: '#2F4D6F',
  },
  {
    brand: 'Xiaomi',
    name: 'POCO X7 Pro',
    slug: 'poco-x7-pro',
    badge: null,
    price: 26999,
    mrp: 29999,
    soldCount: 210,
    storage: '256GB',
    color: 'POCO Yellow',
    colorHex: '#FFC800',
  },
  {
    brand: 'Xiaomi',
    name: 'POCO F7 Pro',
    slug: 'poco-f7-pro',
    badge: null,
    price: 34999,
    mrp: 38999,
    soldCount: 145,
    storage: '256GB',
    color: 'Titan Black',
    colorHex: '#1D1E20',
  },

  // ─── VIVO / IQOO (5 products) ────────────────────────────────────
  {
    brand: 'vivo',
    name: 'vivo X200 Pro',
    slug: 'vivo-x200-pro',
    badge: 'HOT',
    price: 89999,
    mrp: 99999,
    soldCount: 85,
    storage: '256GB',
    color: 'Titanium Blue',
    colorHex: '#35485E',
  },
  {
    brand: 'vivo',
    name: 'vivo V50',
    slug: 'vivo-v50',
    badge: null,
    price: 34999,
    mrp: 38999,
    soldCount: 190,
    storage: '256GB',
    color: 'Sunset Blush',
    colorHex: '#E2978E',
  },
  {
    brand: 'iQOO',
    name: 'iQOO 13',
    slug: 'iqoo-13',
    badge: 'NEW',
    price: 54999,
    mrp: 59999,
    soldCount: 160,
    storage: '256GB',
    color: 'Legend White',
    colorHex: '#FFFFFF',
  },
  {
    brand: 'iQOO',
    name: 'iQOO Neo 10',
    slug: 'iqoo-neo-10',
    badge: null,
    price: 34999,
    mrp: 37999,
    soldCount: 140,
    storage: '256GB',
    color: 'Fiery Orange',
    colorHex: '#D94D26',
  },
  {
    brand: 'vivo',
    name: 'vivo Y300 Plus',
    slug: 'vivo-y300-plus',
    badge: null,
    price: 24999,
    mrp: 27999,
    soldCount: 175,
    storage: '128GB',
    color: 'Silk Green',
    colorHex: '#93B39E',
  },

  // ─── OPPO / REALME (5 products) ──────────────────────────────────
  {
    brand: 'OPPO',
    name: 'OPPO Find X8 Pro',
    slug: 'oppo-find-x8-pro',
    badge: 'NEW',
    price: 89999,
    mrp: 99999,
    soldCount: 75,
    storage: '512GB',
    color: 'Space Black',
    colorHex: '#1B1C1E',
  },
  {
    brand: 'OPPO',
    name: 'OPPO Reno 13 Pro',
    slug: 'oppo-reno-13-pro',
    badge: null,
    price: 44999,
    mrp: 49999,
    soldCount: 130,
    storage: '256GB',
    color: 'Butterfly Purple',
    colorHex: '#846FA6',
  },
  {
    brand: 'Realme',
    name: 'Realme GT 7 Pro',
    slug: 'realme-gt-7-pro',
    badge: 'HOT',
    price: 39999,
    mrp: 44999,
    soldCount: 195,
    storage: '256GB',
    color: 'Mars Orange',
    colorHex: '#D4532B',
  },
  {
    brand: 'Realme',
    name: 'Realme 14x',
    slug: 'realme-14x',
    badge: null,
    price: 15999,
    mrp: 17999,
    soldCount: 280,
    storage: '128GB',
    color: 'Crystal Black',
    colorHex: '#18191B',
  },
  {
    brand: 'OPPO',
    name: 'OPPO A3 Pro',
    slug: 'oppo-a3-pro',
    badge: null,
    price: 22999,
    mrp: 25999,
    soldCount: 150,
    storage: '128GB',
    color: 'Starry Cream',
    colorHex: '#EAE1CE',
  },

  // ─── OTHERS: MOTOROLA, NOTHING, ASUS (5 products) ─────────────────
  {
    brand: 'Motorola',
    name: 'Motorola Edge 50 Ultra',
    slug: 'motorola-edge-50-ultra',
    badge: null,
    price: 59999,
    mrp: 64999,
    soldCount: 92,
    storage: '512GB',
    color: 'Nordic Wood',
    colorHex: '#9E7E63',
  },
  {
    brand: 'Motorola',
    name: 'Motorola Razr 50',
    slug: 'motorola-razr-50',
    badge: 'HOT',
    price: 64999,
    mrp: 74999,
    soldCount: 88,
    storage: '256GB',
    color: 'Koala Grey',
    colorHex: '#676A70',
  },
  {
    brand: 'Nothing',
    name: 'Nothing Phone (3)',
    slug: 'nothing-phone-3',
    badge: 'NEW',
    price: 69999,
    mrp: 74999,
    soldCount: 115,
    storage: '256GB',
    color: 'Transparent White',
    colorHex: '#F0F0F0',
  },
  {
    brand: 'Nothing',
    name: 'Nothing Phone (2a) Plus',
    slug: 'nothing-phone-2a-plus',
    badge: null,
    price: 29999,
    mrp: 32999,
    soldCount: 165,
    storage: '256GB',
    color: 'Metallic Grey',
    colorHex: '#4C4E52',
  },
  {
    brand: 'ASUS',
    name: 'ASUS ROG Phone 9',
    slug: 'asus-rog-phone-9',
    badge: 'HOT',
    price: 99999,
    mrp: 109999,
    soldCount: 55,
    storage: '512GB',
    color: 'Phantom Black',
    colorHex: '#141416',
  },
];

async function main() {
  console.log('🔄 Cleaning up existing records...');
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();

  console.log('🏷️ Seeding brands...');
  const brandMap = new Map();
  for (const b of BRANDS_DATA) {
    const created = await prisma.brand.create({
      data: {
        name: b.name,
        logoUrl: b.logoUrl,
        tagline: b.tagline,
      },
    });
    brandMap.set(b.name, created.id);
  }
  console.log(`✅ Seeded ${brandMap.size} brands`);

  console.log('📱 Seeding 50 products with variants and EMI plans...');
  let count = 0;
  for (const p of PHONE_SPECS) {
    const brandId = brandMap.get(p.brand);
    if (!brandId) {
      console.warn(`Brand ${p.brand} not found for ${p.name}`);
      continue;
    }

    const emiPlansData = generateEMIPlans(p.price);

    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        brandId,
        badge: p.badge,
        category: 'smartphone',
        variants: {
          create: [
            {
              label: `${p.storage} – ${p.color}`,
              storage: p.storage,
              color: p.color,
              colorHex: p.colorHex,
              mrp: p.mrp,
              price: p.price,
              soldCount: p.soldCount,
              imageUrl: img(p.slug),
              images: [
                img(p.slug),
              ],
              emiPlans: {
                create: emiPlansData,
              },
            },
          ],
        },
      },
    });
    count++;
  }

  console.log(`🎉 Successfully seeded ${count} products with real images & EMI plans!`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
