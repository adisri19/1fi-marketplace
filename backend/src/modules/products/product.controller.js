const service = require('./product.service');
const asyncWrapper = require('../../middleware/asyncWrapper');

const getAll = asyncWrapper(async (req, res) => {
  const data = await service.getAllProducts(req.query);
  res.status(200).json({ status: 'success', results: data.length, data });
});

const getBySlug = asyncWrapper(async (req, res) => {
  const data = await service.getProductBySlug(req.params.slug);
  res.status(200).json({ status: 'success', data });
});

module.exports = { getAll, getBySlug };
