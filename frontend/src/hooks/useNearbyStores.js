import { useQuery } from '@tanstack/react-query';
import { fetchNearbyStores } from '../services/nearbyStores';

export const useNearbyStores = (userLocation, radiusMeters = 5000, enabled = true) =>
  useQuery({
    queryKey: ['nearby-stores', userLocation?.lat, userLocation?.lng, radiusMeters],
    queryFn: () => fetchNearbyStores(userLocation.lat, userLocation.lng, radiusMeters),
    enabled: enabled && !!userLocation?.lat && !!userLocation?.lng,
    staleTime: 10 * 60 * 1000,
  });
