import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_USER = {
  name: 'Aditya Srivastava',
  email: 'aditya@1fi.in',
  phone: '+91 98765 43210',
  limit: 250000,
  usedLimit: 0,
  avatar: null,
  kycVerified: true,
  joinedAt: '2026-09-01T00:00:00.000Z',
  mutualFunds: [
    {
      id: 'mf-1',
      name: 'HDFC Top 100 Large Cap Fund',
      invested: 200000,
      ytdReturns: '+14.2%',
      pledgedAmount: 125000,
      folio: 'Folio ***8921',
    },
    {
      id: 'mf-2',
      name: 'Axis Bluechip Growth Fund',
      invested: 175000,
      ytdReturns: '+11.8%',
      pledgedAmount: 125000,
      folio: 'Folio ***4512',
    },
  ],
  activeEMIs: [],
};

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      isOnboarded: true,

      setUser: (userData) =>
        set({ user: userData, isOnboarded: true }),

      updateUser: (fields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...fields } : fields,
        })),

      clearUser: () =>
        set({ user: null, isOnboarded: false }),

      getInitials: () => {
        const name = get().user?.name || '';
        return (
          name
            .split(' ')
            .filter(Boolean)
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || '?'
        );
      },
    }),
    {
      name: '1fi-user-storage', // persists to localStorage
      partialize: (state) => ({
        user: state.user,
        isOnboarded: state.isOnboarded,
      }),
    }
  )
);
