const prisma = require('../../config/database');

const findAll = () =>
  prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
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

const findBySlug = (slug) =>
  prisma.product.findUnique({
    where: { slug },
    include: {
      variants: {
        include: {
          emiPlans: { orderBy: { tenureMonths: 'asc' } },
        },
      },
    },
  });

module.exports = { findAll, findBySlug };
