import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000,
});

export const fetchProducts = async () => {
  const { data } = await api.get('/api/products');
  return data.data;
};

export const fetchProductBySlug = async (slug) => {
  const { data } = await api.get(`/api/products/${slug}`);
  return data.data;
};

export default api;
