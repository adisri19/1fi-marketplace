const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // ─── PRODUCT 1: iPhone 17 Pro ────────────────────────────────────
  const iphone = await prisma.product.create({
    data: {
      name: 'Apple iPhone 17 Pro',
      slug: 'iphone-17-pro',
      brand: 'Apple',
      badge: 'NEW',
      variants: {
        create: [
          {
            label: '256GB – Natural Titanium',
            storage: '256GB',
            color: 'Natural Titanium',
            colorHex: '#E8D5B7',
            mrp: 134900,
            price: 127400,
            soldCount: 70,
            imageUrl: 'https://placehold.co/600x600/f5f5f5/333?text=iPhone+17+Pro+Silver',
            images: [
              'https://placehold.co/600x600/f5f5f5/333?text=iPhone+17+Pro+Front',
              'https://placehold.co/600x600/f5f5f5/333?text=iPhone+17+Pro+Back',
              'https://placehold.co/600x600/f5f5f5/333?text=iPhone+17+Pro+Side',
            ],
            emiPlans: {
              create: [
                { tenureMonths: 3,  monthlyAmount: 44967, interestRate: 0,    cashback: 7500 },
                { tenureMonths: 6,  monthlyAmount: 22483, interestRate: 0,    cashback: 7500 },
                { tenureMonths: 9,  monthlyAmount: 14989, interestRate: 0,    cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 11242, interestRate: 0,    cashback: 7500, isPopular: true },
                { tenureMonths: 24, monthlyAmount: 5621,  interestRate: 0,    cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 4297,  interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 3385,  interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 2842,  interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
          {
            label: '512GB – Desert Titanium',
            storage: '512GB',
            color: 'Desert Titanium',
            colorHex: '#C4A882',
            mrp: 154900,
            price: 146400,
            soldCount: 35,
            imageUrl: 'https://placehold.co/600x600/f5f0e8/333?text=iPhone+17+Pro+Desert',
            images: [
              'https://placehold.co/600x600/f5f0e8/333?text=Desert+Front',
              'https://placehold.co/600x600/f5f0e8/333?text=Desert+Back',
            ],
            emiPlans: {
              create: [
                { tenureMonths: 3,  monthlyAmount: 51467, interestRate: 0,    cashback: 7500 },
                { tenureMonths: 6,  monthlyAmount: 25733, interestRate: 0,    cashback: 7500 },
                { tenureMonths: 9,  monthlyAmount: 17155, interestRate: 0,    cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 12867, interestRate: 0,    cashback: 7500, isPopular: true },
                { tenureMonths: 24, monthlyAmount: 6433,  interestRate: 0,    cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 4917,  interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 3873,  interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 3251,  interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── PRODUCT 2: Samsung Galaxy S25 Ultra ─────────────────────────
  const samsung = await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S25 Ultra',
      slug: 'samsung-s25-ultra',
      brand: 'Samsung',
      badge: 'HOT',
      variants: {
        create: [
          {
            label: '256GB – Titanium Black',
            storage: '256GB',
            color: 'Titanium Black',
            colorHex: '#1C1C1E',
            mrp: 129999,
            price: 119999,
            soldCount: 120,
            imageUrl: 'https://placehold.co/600x600/1c1c1e/fff?text=S25+Ultra+Black',
            images: [
              'https://placehold.co/600x600/1c1c1e/fff?text=S25+Front',
              'https://placehold.co/600x600/1c1c1e/fff?text=S25+Back',
            ],
            emiPlans: {
              create: [
                { tenureMonths: 3,  monthlyAmount: 39999, interestRate: 0,    cashback: 5000 },
                { tenureMonths: 6,  monthlyAmount: 19999, interestRate: 0,    cashback: 5000 },
                { tenureMonths: 9,  monthlyAmount: 13333, interestRate: 0,    cashback: 5000 },
                { tenureMonths: 12, monthlyAmount: 9999,  interestRate: 0,    cashback: 5000, isPopular: true },
                { tenureMonths: 24, monthlyAmount: 5416,  interestRate: 0,    cashback: 5000 },
                { tenureMonths: 36, monthlyAmount: 3898,  interestRate: 10.5, cashback: 5000 },
                { tenureMonths: 48, monthlyAmount: 3071,  interestRate: 10.5, cashback: 5000 },
                { tenureMonths: 60, monthlyAmount: 2578,  interestRate: 10.5, cashback: 5000 },
              ],
            },
          },
          {
            label: '512GB – Titanium Gray',
            storage: '512GB',
            color: 'Titanium Gray',
            colorHex: '#8A8A8E',
            mrp: 149999,
            price: 139999,
            soldCount: 55,
            imageUrl: 'https://placehold.co/600x600/8a8a8e/fff?text=S25+Ultra+Gray',
            images: [
              'https://placehold.co/600x600/8a8a8e/fff?text=Gray+Front',
              'https://placehold.co/600x600/8a8a8e/fff?text=Gray+Back',
            ],
            emiPlans: {
              create: [
                { tenureMonths: 3,  monthlyAmount: 46666, interestRate: 0,    cashback: 5000 },
                { tenureMonths: 6,  monthlyAmount: 23333, interestRate: 0,    cashback: 5000 },
                { tenureMonths: 9,  monthlyAmount: 15555, interestRate: 0,    cashback: 5000 },
                { tenureMonths: 12, monthlyAmount: 11666, interestRate: 0,    cashback: 5000, isPopular: true },
                { tenureMonths: 24, monthlyAmount: 6320,  interestRate: 0,    cashback: 5000 },
                { tenureMonths: 36, monthlyAmount: 4548,  interestRate: 10.5, cashback: 5000 },
                { tenureMonths: 48, monthlyAmount: 3583,  interestRate: 10.5, cashback: 5000 },
                { tenureMonths: 60, monthlyAmount: 3008,  interestRate: 10.5, cashback: 5000 },
              ],
            },
          },
        ],
      },
    },
  });

  // ─── PRODUCT 3: OnePlus 13 ────────────────────────────────────────
  const oneplus = await prisma.product.create({
    data: {
      name: 'OnePlus 13',
      slug: 'oneplus-13',
      brand: 'OnePlus',
      variants: {
        create: [
          {
            label: '256GB – Midnight Ocean',
            storage: '256GB',
            color: 'Midnight Ocean',
            colorHex: '#1A3A5C',
            mrp: 69999,
            price: 64999,
            soldCount: 200,
            imageUrl: 'https://placehold.co/600x600/1a3a5c/fff?text=OnePlus+13+Ocean',
            images: [
              'https://placehold.co/600x600/1a3a5c/fff?text=Ocean+Front',
              'https://placehold.co/600x600/1a3a5c/fff?text=Ocean+Back',
            ],
            emiPlans: {
              create: [
                { tenureMonths: 3,  monthlyAmount: 21666, interestRate: 0,    cashback: 3000 },
                { tenureMonths: 6,  monthlyAmount: 10833, interestRate: 0,    cashback: 3000 },
                { tenureMonths: 9,  monthlyAmount: 7222,  interestRate: 0,    cashback: 3000 },
                { tenureMonths: 12, monthlyAmount: 5416,  interestRate: 0,    cashback: 3000, isPopular: true },
                { tenureMonths: 24, monthlyAmount: 3118,  interestRate: 10.5, cashback: 3000 },
                { tenureMonths: 36, monthlyAmount: 2237,  interestRate: 10.5, cashback: 3000 },
              ],
            },
          },
          {
            label: '512GB – Arctic Dawn',
            storage: '512GB',
            color: 'Arctic Dawn',
            colorHex: '#B8D4E8',
            mrp: 79999,
            price: 74999,
            soldCount: 88,
            imageUrl: 'https://placehold.co/600x600/b8d4e8/333?text=OnePlus+13+Arctic',
            images: [
              'https://placehold.co/600x600/b8d4e8/333?text=Arctic+Front',
              'https://placehold.co/600x600/b8d4e8/333?text=Arctic+Back',
            ],
            emiPlans: {
              create: [
                { tenureMonths: 3,  monthlyAmount: 24999, interestRate: 0,    cashback: 3000 },
                { tenureMonths: 6,  monthlyAmount: 12499, interestRate: 0,    cashback: 3000 },
                { tenureMonths: 9,  monthlyAmount: 8333,  interestRate: 0,    cashback: 3000 },
                { tenureMonths: 12, monthlyAmount: 6249,  interestRate: 0,    cashback: 3000, isPopular: true },
                { tenureMonths: 24, monthlyAmount: 3598,  interestRate: 10.5, cashback: 3000 },
                { tenureMonths: 36, monthlyAmount: 2581,  interestRate: 10.5, cashback: 3000 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Seeded:', iphone.name, samsung.name, oneplus.name);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
