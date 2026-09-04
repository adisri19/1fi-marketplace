const router = require('express').Router();
const ctrl = require('./brand.controller');

router.get('/', ctrl.getAll);
router.get('/:brandId', ctrl.getById);
router.get('/:brandId/products', ctrl.getProducts);

module.exports = router;
