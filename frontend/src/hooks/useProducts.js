import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/api';

export const useProducts = () =>
  useQuery({ queryKey: ['products'], queryFn: fetchProducts, staleTime: 5 * 60 * 1000 });
