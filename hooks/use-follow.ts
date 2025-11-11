import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useAuthStore from "@/store";
import { useMutation } from "convex/react";
import { useState } from "react";

export const useToggleFollow = () => {
  const toggleFollowMutation = useMutation(api.posts.updateFollow);
  const {user} = useAuthStore();
  const id = user?._id as Id<"users">
  const [isLoading, setIsLoading] = useState(false);

  const toggleFollow = async ({userId, username, avatar}:{
    userId: Id<"users">, 
    username: string, 
    avatar: string}) => {
        setIsLoading(true)
        // console.log("actual user",id, 'following', userId);
        
    try {
      const res = await toggleFollowMutation({
        id,
        userId,
        username,
        avatar 
      });
      return res;
    } catch (err) {
      console.error("Failed to toggle like:", err);
      return { success: false, message: "Failed to toggle like" };
    } finally {
        setIsLoading(false)
    }
  };

  return { toggleFollow, isLoading };
};
