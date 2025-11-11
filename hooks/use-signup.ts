
// import { api, internal } from "@/convex/_generated/api";
// import { newUser } from "@/type";
// import { useMutation } from "convex/react";
// import { useState } from 'react';

// export const useUserSignup = ()=> {
//     const mutate = useMutation(api.users.createUser)
//     const [isloading ,setIsLoading] = useState(false);

//     const handleSignup = async (newUser: newUser) => {
//     setIsLoading(true)

//   try {

//     const createdUser = await mutate(internal.users.upsertFromClerk(newUser));
//     console.log(createdUser);
//     // toast.success("Successfully placed Order, Check your email for confirmation")
//     setIsLoading(false)
//     return createdUser;
//   } catch (error) {
//     setIsLoading(false)
//     console.error("Error creating an account", error);
//     // toast.error("Failed to order items");
//   }
// };

// return {handleSignup, isloading}
// }