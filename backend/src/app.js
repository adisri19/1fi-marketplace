const express = require('express');
const cors = require('cors');
const productRoutes = require('./modules/products/product.routes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET'],
}));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok', ts: Date.now() }));
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
