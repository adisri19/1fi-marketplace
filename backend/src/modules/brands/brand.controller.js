const service = require('./brand.service');
const asyncWrapper = require('../../middleware/asyncWrapper');

const getAll = asyncWrapper(async (req, res) => {
  const data = await service.getAllBrands();
  res.status(200).json({ status: 'success', results: data.length, data });
});

const getById = asyncWrapper(async (req, res) => {
  const data = await service.getBrandById(req.params.brandId);
  res.status(200).json({ status: 'success', data });
});

const getProducts = asyncWrapper(async (req, res) => {
  const data = await service.getBrandProducts(req.params.brandId);
  res.status(200).json({ status: 'success', results: data.length, data });
});

module.exports = { getAll, getById, getProducts };
