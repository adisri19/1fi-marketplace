const prisma = require('../../config/database');

const findAll = () =>
  prisma.brand.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

const findById = (id) =>
  prisma.brand.findUnique({
    where: { id },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

const findProductsByBrand = (brandId) =>
  prisma.product.findMany({
    where: { brandId },
    orderBy: { createdAt: 'desc' },
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

module.exports = { findAll, findById, findProductsByBrand };
