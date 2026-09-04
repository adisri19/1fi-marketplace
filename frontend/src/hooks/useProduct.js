import { useQuery } from '@tanstack/react-query';
import { fetchProductBySlug } from '../services/api';

export const useProduct = (slug) =>
  useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
