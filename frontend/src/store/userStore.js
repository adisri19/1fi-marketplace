import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_USER = null; // null = no user onboarded yet

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      isOnboarded: false,

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
