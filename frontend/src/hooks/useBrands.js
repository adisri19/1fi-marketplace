import { useQuery } from '@tanstack/react-query';
import { fetchBrands, fetchBrandById, fetchBrandProducts } from '../services/api';

export const useBrands = () =>
  useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: 5 * 60 * 1000,
  });

export const useBrand = (brandId) =>
  useQuery({
    queryKey: ['brand', brandId],
    queryFn: () => fetchBrandById(brandId),
    enabled: !!brandId,
    staleTime: 5 * 60 * 1000,
  });

export const useBrandProducts = (brandId) =>
  useQuery({
    queryKey: ['brandProducts', brandId],
    queryFn: () => fetchBrandProducts(brandId),
    enabled: !!brandId,
    staleTime: 5 * 60 * 1000,
  });
