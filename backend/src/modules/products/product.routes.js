const router = require('express').Router();
const ctrl = require('./product.controller');

router.get('/', ctrl.getAll);
router.get('/:slug', ctrl.getBySlug);

module.exports = router;
