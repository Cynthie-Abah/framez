import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { clerkUser } from './type';

type CreateUserFn = (payload: {
    clerkId: string;
    email?: string | null;
    username?: string | null;
    followers: string[];
    following: string[];
}) => Promise<void>;

interface AuthState {
    isAuthenticated: boolean;
    user: clerkUser | null;
    setUser: (user: clerkUser) => void;
    createUserOnServer: (user: clerkUser, createUserFn: CreateUserFn) => Promise<void>;
    login: () => void;
    signup: () => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ isAuthenticated: true, user }),
      createUserOnServer: async (user, createUserFn) => {
        set({ isAuthenticated: true, user });
        try {
          await createUserFn({
            clerkId: user.id,
            email: user.email ?? null,
            username: user.username ?? null,
            followers: [],
            following: [],
          });
        } catch (err) {
          console.error('createUser failed', err);
        }
      },
      login: () => set({ isAuthenticated: true }),
      signup: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;