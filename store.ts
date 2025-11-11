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
    createUserOnServer: (user: clerkUser, createUserFn: CreateUserFn) => void;
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
      createUserOnServer: (user, createUserFn) => {
        set({ isAuthenticated: true, user });
        try {
           createUserFn({
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

interface PostState {
  posts: any[];
  setPosts: (posts: any[]) => void;
  loading: boolean;
  error: string | null;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      posts: [],
      loading: false,
      error: null,
      setPosts: (posts) => set({ posts }),
    }),
    {
      name: 'post-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;