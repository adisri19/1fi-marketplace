import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/api';

export const useProducts = (params = {}) =>
  useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const res = await fetchProducts(params);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

export const useInfiniteProducts = (pageSize = 12) =>
  useInfiniteQuery({
    queryKey: ['products-infinite', pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchProducts({ limit: pageSize, offset: pageParam });
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const count = lastPage.data ? lastPage.data.length : 0;
      return count === pageSize ? allPages.length * pageSize : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
