import { api } from "@/convex/_generated/api";
import useAuthStore from "@/store";
import { useQuery } from "convex/react";

export function useFetchUserByEmail() {
  const {email, setUser} = useAuthStore();
  // const {setUser} = use

  // Only run the query if clerkUser exists
  const user = useQuery(api.users.getUserByEmail, { email: email }
  );

  const isLoading = email && !user;
  const error = email && !user ? "User not found in Convex" : null;

  return { user, isLoading, error };
}
