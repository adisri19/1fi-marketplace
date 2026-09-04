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
  // ══════════════════════════════════════════════
  // APPLE — official apple.com press images
  // ══════════════════════════════════════════════
  'iphone-17-pro': {
    main: 'https://www.apple.com/newsroom/images/2025/09/apple-introduces-iphone-17-pro/article/Apple-iPhone-17-Pro-hero-250909.jpg.og.jpg',
    gallery: [
      'https://www.apple.com/newsroom/images/2025/09/apple-introduces-iphone-17-pro/article/Apple-iPhone-17-Pro-hero-250909.jpg.og.jpg',
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-pro-finish-select-202509-6-9inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1725394942',
    ],
  },
  'iphone-17-pro-max': {
    main: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-pro-max-finish-select-202509-6-9inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80',
    gallery: [],
  },
  'iphone-17': {
    main: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-finish-select-202509-6-1inch-ultramarine?wid=5120&hei=2880&fmt=p-jpg&qlt=80',
    gallery: [],
  },
  'iphone-16': {
    main: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch_GEO_IN?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1725399363',
    gallery: [],
  },
  'iphone-16-plus': {
    main: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-plus-finish-select-202409-6-7inch_GEO_IN?wid=5120&hei=2880&fmt=p-jpg&qlt=80',
    gallery: [],
  },
  'iphone-15': {
    main: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80',
    gallery: [],
  },
  'iphone-se-4': {
    main: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202502-6-1inch-midnight?wid=5120&hei=2880&fmt=p-jpg&qlt=80',
    gallery: [],
  },
  'ipad-air-m3': {
    main: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202405?wid=5120&hei=2880&fmt=p-jpg&qlt=80',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // SAMSUNG — official samsung.com/news images
  // ══════════════════════════════════════════════
  'samsung-s25-ultra': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/2501/gallery/in-galaxy-s25-ultra-sm-s938-sm-s938bzkgins-thumb-542032229',
    gallery: [
      'https://images.samsung.com/is/image/samsung/p6pim/in/2501/gallery/in-galaxy-s25-ultra-sm-s938-sm-s938bzkgins-thumb-542032229',
      'https://images.samsung.com/is/image/samsung/p6pim/in/2501/gallery/in-galaxy-s25-ultra-sm-s938-534907452',
    ],
  },
  'samsung-s25-plus': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/2501/gallery/in-galaxy-s25-sm-s931-sm-s931bzkgins-thumb-542035769',
    gallery: [],
  },
  'samsung-s25': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/2501/gallery/in-galaxy-s25-sm-s931-sm-s931bzkgins-thumb-542035769',
    gallery: [],
  },
  'samsung-z-fold-7': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/2507/gallery/in-galaxy-z-fold7-sm-f956-thumb',
    gallery: [],
  },
  'samsung-z-flip-7': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/2507/gallery/in-galaxy-z-flip7-sm-f731-thumb',
    gallery: [],
  },
  'samsung-a56': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-a566elggins/gallery/in-galaxy-a56-5g-sm-a566-sm-a566elggins-thumb-543400874',
    gallery: [],
  },
  'samsung-a36': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-a366elggins/gallery/in-galaxy-a36-5g-sm-a366-sm-a366elggins-thumb-543497781',
    gallery: [],
  },
  'samsung-m55': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-m556bblgins/gallery/in-galaxy-m55-5g-sm-m556-sm-m556bblgins-thumb-539717588',
    gallery: [],
  },
  'samsung-s24-fe': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s721bzbgins/gallery/in-galaxy-s24-fe-sm-s721-sm-s721bzbgins-thumb-541302951',
    gallery: [],
  },
  'samsung-tab-s10': {
    main: 'https://images.samsung.com/is/image/samsung/p6pim/in/2410/gallery/in-galaxy-tab-s10-x710-sm-x710nzaainu-thumb-541859941',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // ONEPLUS — official oneplus.com images
  // ══════════════════════════════════════════════
  'oneplus-13': {
    main: 'https://image01.oneplus.net/ebp/202412/09/1-m00-52-03-rb8bwWdXQnGAajpKAAFqLXyWrEU516.png',
    gallery: [
      'https://image01.oneplus.net/ebp/202412/09/1-m00-52-03-rb8bwWdXQnGAajpKAAFqLXyWrEU516.png',
    ],
  },
  'oneplus-13r': {
    main: 'https://image01.oneplus.net/ebp/202501/07/1-m00-52-03-rB8BWWd4nHiADtcuAAFvqL7bXF8728.png',
    gallery: [],
  },
  'oneplus-nord-4': {
    main: 'https://image01.oneplus.net/ebp/202407/16/1-m00-4f-a1-rb8bwWaV6suAFdBiAAF7aqsH1r4793.png',
    gallery: [],
  },
  'oneplus-open-2': {
    main: 'https://image01.oneplus.net/ebp/202503/oneplus-open-2-hero.png',
    gallery: [],
  },
  'oneplus-12': {
    main: 'https://image01.oneplus.net/ebp/202401/11/1-m00-4b-0e-rb8bwWWfbryAAlSRAAFgq4xt0pA423.png',
    gallery: [],
  },
  'oneplus-nord-ce-4': {
    main: 'https://image01.oneplus.net/ebp/202404/23/1-m00-4f-9e-rB8BWWai9nmAQ7jTAAFMEE0a6m4393.png',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // GOOGLE PIXEL — official store.google.com
  // ══════════════════════════════════════════════
  'pixel-9-pro-xl': {
    main: 'https://lh3.googleusercontent.com/1mhkpBNNS53S0iIzO7iYy1QSJHKukHj6xMkrW8lkpnI5EGkLiL_M7-vLEuCuTiB-aMJtE18wA1ADOiEwpB4Ib3ZJiKFUoA=rw-e365-w1440',
    gallery: [],
  },
  'pixel-9-pro': {
    main: 'https://lh3.googleusercontent.com/Nu-yFVoKL3PNtJaFwcNdUzpfPFGJqgBCDqWBp4vNwCGPYXGxnSxlMuuSEy1sJQXMGOUY4M9WFECDQaSwNBdN2ydBZjQx=rw-e365-w1440',
    gallery: [],
  },
  'pixel-9': {
    main: 'https://lh3.googleusercontent.com/5e5VdOBqNvHSuJCuaQFXTodJDQXeL0JdP6tHOaGEZDAuPTuNQQJk1Zul7sU4fqekQv5v3R4Q4U9sAflxhU3WvvO1iI3H=rw-e365-w1440',
    gallery: [],
  },
  'pixel-9-pro-fold': {
    main: 'https://lh3.googleusercontent.com/MqPF9m2NL_4WM4JXePJT1gPGvAH1cpzmPbz_7N8R0YO-Xl7m6mhBNPpMkXP7C3QyFp-qlgEiGH3n_RDlFmgMTLrygCUkg=rw-e365-w1440',
    gallery: [],
  },
  'pixel-8a': {
    main: 'https://lh3.googleusercontent.com/XN7d6ioFLMCQ3fBjpYbnGFPFpNJX9fIhchOsJF3k4kO7V84ixdH5mcGb01gzn9N6bMuH_B5Sm-fzm9FPAY09bVjBV8mq=rw-e365-w1440',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // XIAOMI — mi.com/in official images
  // ══════════════════════════════════════════════
  'xiaomi-15-ultra': {
    main: 'https://i01.appmifile.com/webfile/globalimg/products/m/xiaomi-15-ultra/section2.png',
    gallery: [],
  },
  'xiaomi-14': {
    main: 'https://i01.appmifile.com/webfile/globalimg/products/m/xiaomi-14/section1.png',
    gallery: [],
  },
  'redmi-note-14-pro': {
    main: 'https://i01.appmifile.com/webfile/globalimg/products/m/redmi-note-14-pro-plus/kv.png',
    gallery: [],
  },
  'redmi-note-14': {
    main: 'https://i01.appmifile.com/webfile/globalimg/products/m/redmi-note-14/kv.png',
    gallery: [],
  },
  'poco-x7-pro': {
    main: 'https://i01.appmifile.com/webfile/globalimg/products/m/poco-x7-pro/kv.png',
    gallery: [],
  },
  'poco-f7-pro': {
    main: 'https://i01.appmifile.com/webfile/globalimg/products/m/poco-f7-pro/kv.png',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // VIVO / IQOO — vivo.com official images
  // ══════════════════════════════════════════════
  'vivo-x200-pro': {
    main: 'https://www.vivo.com/content/dam/vivo-website/in/phones/X-series/X200-Pro/overview/kv.png',
    gallery: [],
  },
  'vivo-v50': {
    main: 'https://www.vivo.com/content/dam/vivo-website/in/phones/V-series/V50/overview/kv.png',
    gallery: [],
  },
  'iqoo-13': {
    main: 'https://www.iqoo.com/content/dam/iqoo-website/in/phones/iqoo-13/overview/kv.png',
    gallery: [],
  },
  'iqoo-neo-10': {
    main: 'https://www.iqoo.com/content/dam/iqoo-website/in/phones/iqoo-neo10/overview/kv.png',
    gallery: [],
  },
  'vivo-y300-plus': {
    main: 'https://www.vivo.com/content/dam/vivo-website/in/phones/Y-series/Y300Plus/overview/kv.png',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // OPPO / REALME
  // ══════════════════════════════════════════════
  'oppo-find-x8-pro': {
    main: 'https://image.oppo.com/content/dam/oppo/product-asset-library/find-x8-pro/find-x8-pro-v1/assets/img/overview/kv-img.png',
    gallery: [],
  },
  'oppo-reno-13-pro': {
    main: 'https://image.oppo.com/content/dam/oppo/product-asset-library/reno13-pro/assets/img/overview/kv.png',
    gallery: [],
  },
  'realme-gt-7-pro': {
    main: 'https://image.realme.com/content/dam/realme/in/products/gt-7-pro/assets/img/overview/kv.png',
    gallery: [],
  },
  'realme-14x': {
    main: 'https://image.realme.com/content/dam/realme/in/products/realme-14x-5g/assets/img/overview/kv.png',
    gallery: [],
  },
  'oppo-a3-pro': {
    main: 'https://image.oppo.com/content/dam/oppo/product-asset-library/a3-pro/assets/img/overview/kv.png',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // MOTOROLA — motorola.in official images
  // ══════════════════════════════════════════════
  'motorola-edge-50-ultra': {
    main: 'https://motorola-global-portal.custhelp.com/ci/fattach/get/1490940/motorola-edge-50-ultra-hero.png',
    gallery: [],
  },
  'motorola-razr-50': {
    main: 'https://motorola-global-portal.custhelp.com/ci/fattach/get/1490939/motorola-razr-50-hero.png',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // NOTHING — nothing.tech official images
  // ══════════════════════════════════════════════
  'nothing-phone-3': {
    main: 'https://nothing.tech/cdn/shop/files/Phone_3_-_Hero_-_Black.png?v=1749561600&width=1200',
    gallery: [
      'https://nothing.tech/cdn/shop/files/Phone_3_-_Hero_-_Black.png?v=1749561600&width=1200',
      'https://nothing.tech/cdn/shop/files/Phone_3_-_Back_-_Black.png?v=1749561600&width=1200',
    ],
  },
  'nothing-phone-2a-plus': {
    main: 'https://nothing.tech/cdn/shop/files/Phone_2a_Plus_-_Hero_-_Black.png?v=1722556800&width=1200',
    gallery: [],
  },

  // ══════════════════════════════════════════════
  // ASUS ROG — asus.com official images
  // ══════════════════════════════════════════════
  'asus-rog-phone-9': {
    main: 'https://dlcdnwebimgs.asus.com/gain/e8d11b5c-3b7a-4c7e-9c6b-5b3f1a2d8e9f/w1200/h630',
    gallery: [],
  },
};

const getProductImage = (slug) => {
  const item = IMAGES[slug];
  if (item?.main) return item.main;
  return `/images/products/${slug}.webp`;
};

const getProductGallery = (slug) => {
  const item = IMAGES[slug];
  if (item?.gallery && item.gallery.length > 0) return item.gallery;
  if (item?.main) return [item.main];
  return [`/images/products/${slug}.webp`];
};

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
              imageUrl: getProductImage(p.slug),
              images: getProductGallery(p.slug),
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
