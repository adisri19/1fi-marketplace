const repo = require('./brand.repository');
const AppError = require('../../utils/AppError');

const getAllBrands = async () => {
  const brands = await repo.findAll();
  return brands.map((b) => ({
    id: b.id,
    name: b.name,
    logoUrl: b.logoUrl,
    tagline: b.tagline,
    productCount: b._count ? b._count.products : 0,
  }));
};

const getBrandById = async (brandId) => {
  if (!brandId) throw new AppError('Brand ID is required', 400);
  const brand = await repo.findById(brandId);
  if (!brand) throw new AppError(`Brand not found with ID: ${brandId}`, 404);
  return {
    id: brand.id,
    name: brand.name,
    logoUrl: brand.logoUrl,
    tagline: brand.tagline,
    productCount: brand._count ? brand._count.products : 0,
  };
};

const getBrandProducts = async (brandId) => {
  if (!brandId) throw new AppError('Brand ID is required', 400);
  return repo.findProductsByBrand(brandId);
};

module.exports = { getAllBrands, getBrandById, getBrandProducts };
