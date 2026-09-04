import { create } from 'zustand';

export const useProductStore = create((set) => ({
  selectedVariantId: null,
  selectedEMIPlanId: null,
  setVariant: (id) => set({ selectedVariantId: id, selectedEMIPlanId: null }),
  setEMIPlan: (id) => set({ selectedEMIPlanId: id }),
  resetProduct: () => set({ selectedVariantId: null, selectedEMIPlanId: null }),
  reset: () => set({ selectedVariantId: null, selectedEMIPlanId: null }),

  // Nearby stores & Geolocation state
  nearbyStores: [],
  userLocation: null,
  locationStatus: 'idle', // 'idle' | 'loading' | 'granted' | 'denied' | 'error'
  setUserLocation: (coords) => set({ userLocation: coords, locationStatus: 'granted' }),
  setLocationStatus: (status) => set({ locationStatus: status }),
  setNearbyStores: (stores) => set({ nearbyStores: stores }),
}));
