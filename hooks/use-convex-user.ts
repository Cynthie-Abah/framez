import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const useConvexUser = (clerkId?: string) => {
  // Only call the hook if clerkId exists
  const user = useQuery(api.users.getUserById, { userId: clerkId || ''})

  const isLoading = user === undefined;
  const error = user === null ? "Failed to fetch user" : null;

  return { user, isLoading, error };
};
