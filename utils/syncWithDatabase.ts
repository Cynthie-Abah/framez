import { api } from "@/convex/_generated/api";
import useAuthStore from "@/store";
import { useUser } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const useSyncUserWithConvex = () => {
  const { user: clerkUser, isSignedIn } = useUser();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const getUserById = useQuery(api.users.getUserById, { userId: clerkUser?.id || 'skip'});
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!isSignedIn) return;

    const syncUser = async () => {
      try {
        // Check if user exists in Convex
        const existingUser = getUserById;

        if (existingUser) {
          // Store existing user in Zustand
          setUser(existingUser);
        router.push('/(tabs)/feed')
        } else {
          // Create new user in Convex
          const email =
            (clerkUser as any).emailAddresses?.[0]?.emailAddress ??
            (clerkUser as any).primaryEmailAddress ??
            "";

            await createUser({
                clerkId: clerkUser?.id || '', 
                email, 
                username: clerkUser?.username || '',
                followers: [],
                following: [],
            });
        }
      } catch (err) {
        console.error("Error syncing user with Convex:", err);
      }
    };

    syncUser();
  }, [clerkUser, isSignedIn]);
};
