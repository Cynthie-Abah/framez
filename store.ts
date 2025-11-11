import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Post, user } from './type';

type CreateUserFn = (payload: {
    clerkId: string;
    email?: string | null;
    username?: string | null;
    followers: string[];
    following: string[];
}) => Promise<void>;

interface AuthState {
    isAuthenticated: boolean;
    user: user | null;
    setUser: (user: user) => void;
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
  posts: Post[];
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