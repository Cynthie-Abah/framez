// import { api } from "@/convex/_generated/api";
// import useAuthStore from "@/store";
// import { useQuery } from "convex/react";

// export function useFetchUserByEmail() {
//   const {email, setUser} = useAuthStore();
//   const user = useQuery(api.users.getUserByEmail, { email: email }
//   );
//   // setUser(user || null)
//   const isLoading = email && !user;
//   const error = email && !user ? "User not found in Convex" : null;

//   return { user, isLoading, error };
// }


import { api } from "@/convex/_generated/api";
import useAuthStore from "@/store";
import { useQuery } from "convex/react";
import { useEffect } from "react";

export function useFetchUserByEmail() {
  const { email, setUser } = useAuthStore();

  const user = useQuery(api.users.getUserByEmail, { email });

  useEffect(() => {
    if (user !== undefined) {
      setUser(user || null);
    }
  }, [user, setUser]);

  const isLoading = user === undefined;
  const error = user === null ? "User not found in Convex" : null;

  return { user, isLoading, error };
}
