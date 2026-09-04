const prisma = require('../../config/database');

const findAll = ({ brand, limit, offset } = {}) => {
  const where = {};
  if (brand) {
    where.brand = {
      name: {
        equals: brand,
        mode: 'insensitive',
      },
    };
  }

  return prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit ? parseInt(limit, 10) : undefined,
    skip: offset ? parseInt(offset, 10) : undefined,
    include: {
      brand: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
          tagline: true,
        },
      },
      variants: {
        select: {
          id: true,
          label: true,
          price: true,
          mrp: true,
          imageUrl: true,
          colorHex: true,
          color: true,
          storage: true,
          soldCount: true,
        },
        orderBy: { price: 'asc' },
      },
    },
  });
};

const findBySlug = (slug) =>
  prisma.product.findUnique({
    where: { slug },
    include: {
      brand: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
          tagline: true,
        },
      },
      variants: {
        include: {
          emiPlans: { orderBy: { tenureMonths: 'asc' } },
        },
      },
    },
  });

module.exports = { findAll, findBySlug };
