// import { api } from "@/convex/_generated/api";
// import { useQuery } from "convex/react";

// export const useConvexUser = (clerkId?: string) => {
//   // Only call the hook if clerkId exists
//   const user = useQuery(api.users.getUserById, { userId: clerkId || ''})

//   const isLoading = user === undefined;
//   const error = user === null ? "Failed to fetch user" : null;

//   return { user, isLoading, error };
// };

import { api } from "@/convex/_generated/api";
import { user } from "@/type";
import { useQuery } from "convex/react";

export const useConvexUser = (clerkId?: string) => {
  // run query only when you have clerkId
  const userData = useQuery(api.users.getUserById,
    clerkId ? { userId: clerkId } : "skip"
  );

  const isLoading = userData === undefined;
  const error = userData === null ? "User not found" : null;

  return { user: userData as user | null, isLoading, error };
};
