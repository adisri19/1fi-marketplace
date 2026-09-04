import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  timeout: 10000,
});

export const fetchProducts = async (params = {}) => {
  const { data } = await api.get('/api/products', { params });
  return data;
};

export const fetchProductBySlug = async (slug) => {
  const { data } = await api.get(`/api/products/${slug}`);
  return data.data;
};

export const fetchBrands = async () => {
  const { data } = await api.get('/api/brands');
  return data.data;
};

export const fetchBrandById = async (brandId) => {
  const { data } = await api.get(`/api/brands/${brandId}`);
  return data.data;
};

export const fetchBrandProducts = async (brandId) => {
  const { data } = await api.get(`/api/brands/${brandId}/products`);
  return data.data;
};

export default api;
