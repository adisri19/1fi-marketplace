import { create } from 'zustand';

export const useProductStore = create((set) => ({
  selectedVariantId: null,
  selectedEMIPlanId: null,
  setVariant: (id) => set({ selectedVariantId: id, selectedEMIPlanId: null }),
  setEMIPlan: (id) => set({ selectedEMIPlanId: id }),
  reset: () => set({ selectedVariantId: null, selectedEMIPlanId: null }),
}));
