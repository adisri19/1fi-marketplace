const repo = require('./product.repository');
const AppError = require('../../utils/AppError');

const getAllProducts = (query = {}) => repo.findAll(query);

const getProductBySlug = async (slug) => {
  if (!slug || typeof slug !== 'string')
    throw new AppError('Invalid slug', 400);
  const product = await repo.findBySlug(slug.toLowerCase());
  if (!product)
    throw new AppError(`No product found with slug: "${slug}"`, 404);
  return product;
};

module.exports = { getAllProducts, getProductBySlug };
